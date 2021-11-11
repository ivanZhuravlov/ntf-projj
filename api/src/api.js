require('dotenv').config();

const { 
  APP_URL,
  JWT_SECRET, 
  STRIPE_WEBHOOK_SECRET,
  STRIPE_API_KEY
} = process.env;

if(!APP_URL) {
  throw new Error('invalid APP_URL');
}

if(!JWT_SECRET) {
  throw new Error('invalid jwt');
}

if(!STRIPE_WEBHOOK_SECRET) {
  throw new Error('invalid STRIPE_WEBHOOK_SECRET');
}

if(!STRIPE_API_KEY) {
  throw new Error('invalid STRIPE_API_KEY');
}

const express        = require('express');
const cors           = require('cors');
const bodyParser     = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const expressJwt     = require('express-jwt');
const jwt            = require('jsonwebtoken');
const sql            = require('./pg');
const stripe         = require('stripe')(STRIPE_API_KEY);
const { 
  serialize, 
  checkPassword,
  isValidEmail,
  authenticateJWT
} = require('./utils');

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(bodyParser.json());

app.use(
  expressJwt({secret: JWT_SECRET, algorithms: ['HS256']}).unless({
    path: ['/register', '/login', '/stripe/webhook']
  })
);

app.use(cors({ methods: ['POST'] }));

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(err.status).send('');
    return;
  }
  
  next();
});


// User
app.post('/register', async (req, res) => {
  if (!req.body) {
    console.log('no body')
    res.status(400).send('Bad Request');
    return;
  }

  try {
    const data = req.body;

    if (!data.email || !isValidEmail(data.email)) {
      throw new Error('bad email')
    }
    
    if (!data.password) {
      throw new Error('bad password')
    }

    const [userAlreadyExist] = await sql`select email from users where email = ${data.email}`;
    if (userAlreadyExist) {
      throw new Error(`Duplicate user registration: ${email}`);
    }

    const passwordHash = await serialize(data.password);
    const user = {
      id: uuidv4(),
      email: data.email,
      password: passwordHash,
      created_at: new Date(),
    }
    
    await sql`insert into users ${sql(user)}`;
    console.log('New email added', {id: user.id, email: user.email});

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
 
  } catch(error) {
    console.log(error.message);
    res.status(500).send();
  }
});

app.post('/login', async (req, res) => {
  if (!req.body) {
    console.log('no body')
    res.status(400).send('Bad Request');
    return;
  }

  try {
    const data = req.body;

    if (!data.email || !isValidEmail(data.email)) {
      throw new Error('invalid email')
    }
    
    if (!data.password) {
      throw new Error('invalid password')
    }
    
    const email    = data.email;
    const password = data.password;

    const [user] = await sql`select * from users where email = ${email}`;
    if (!user) {
      throw new Error('user not found');
    }

    const passwordMatches = await checkPassword(password, user.password);
    if (!passwordMatches) {
      throw new Error('user not found');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
    
  } catch(error) {
    console.log(error.message);
    res.status(500).send();

  }

});

app.post('/profile', authenticateJWT, async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).send('Bad Request');
  }

  try {
    const userId = req.user.id;
    // TODO
    const infos = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    };

    const [{ email }] = await sql`
      update users set ${sql({data: JSON.stringify(infos)})}
      where id = ${userId}
      returning email
    `;


    res.status(200).send();
  } catch (error) {
    console.log(error)
    res.status(400).send('Invalid format');
  }
});

app.get('/profile', authenticateJWT, async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).send('Bad Request');
  }

  try {
    const userId = req.user.id;
    const [user] = await sql`
      select email, data
      from users
      where id = ${userId}
    `;

    const [subscription] = await sql`
      select data->'plan'->'id' as plan_id, is_active, terminated_at 
      from subscriptions
      where user_id = ${userId}
      and is_active is true
    `;
    
    res.json({
      user: {
        ...user.data,
        email: user.email
      },
      subscription: subscription || null,
    });
  } catch (error) {
    res.status(400).send(`${error.message}`);
  }
});

// Stripe
app.post('/create-checkout-session', authenticateJWT, async (req, res) => {
  const { priceId } = req.body;
  const userId = req.user.id;

  try {
    const [customer] = await sql`select stripe, email from users where id = ${userId}`;
    if (!customer) {
      throw new Error(`User ${userId} not exist`);
    }

    const [activeSubscription] = await sql`select * from subscriptions where user_id = ${userId} and is_active is true`;
    
    if (activeSubscription) {
      throw new Error(`User ${userId} have already a subscription, please upgrade instead create a new one`);
      return ;
    }

    const subscriptionSession = {
      mode: "subscription",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/settings?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${APP_URL}/settings?session_id={CHECKOUT_SESSION_ID}&status=canceled`,
    };

    if (customer && customer.stripe) {
      subscriptionSession['customer'] = customer.stripe;
    } 
    else if (customer && customer.email) {
      subscriptionSession['customer_email'] = customer.email;
    }

    const session = await stripe.checkout.sessions.create(subscriptionSession);

    res.send({ sessionId: session.id });
  } catch (e) {
    console.log(`[Stripe][error][User][${userId}]`);
    console.log(e.message);
    res.status(400).send('An error occured');
  }
});

app.post('/upgrade-plan', authenticateJWT, async (req, res) => {
  const { priceId } = req.body;
  const userId = req.user.id;

  try {
    const [customer] = await sql`select stripe, email from users where id = ${userId}`;
    if (!customer) {
      throw new Error(`User ${userId} not exist`);
    }

    const [activeSubscription] = await sql`select * from subscriptions 
      where user_id = ${userId}
      and is_active is true
      and data->'plan'->>'id' != ${priceId}
    `;
    if (!activeSubscription) {
      throw new Error(`User ${userId} don't have active subscription`);
    }

    const subscription = await stripe.subscriptions.retrieve(activeSubscription.stripe_id);
    const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }]
    });
    await sql`update subscriptions set ${sql({
      data: JSON.stringify(updatedSubscription),
      stripe_id: updatedSubscription.id,
    })} where stripe_id = ${subscription.id}`;

    res.status(200).send();
  } catch (e) {
    console.log(`[Stripe][error][User][${userId}]`);
    console.log(e.message);
    res.status(400).send('An error occured');
  }
});

// TODO : check signature (https://stripe.com/docs/webhooks/signatures)
app.post('/stripe/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).send('Bad Request');
  }
  if (!req.query || typeof req.query !== 'object' || req.query.sig !== STRIPE_WEBHOOK_SECRET) {
    res.status(400).send('Bad Request');
  }

  const event = req.body;

  let customer;
  switch (event.type) {
    case 'customer.created':
      await customerCreated(event.data.object);
      break;
    case 'customer.subscription.created':
      await subscriptionCreated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await subscriptionDeleted(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`, JSON.stringify(event));
  }

  // Return a res to acknowledge receipt of the event
  res.json({received: true});
});

app.get('/invoice', authenticateJWT, async (req, res) => {
  if (!req.body) {
    console.log('no body')
    res.status(400).send('Bad Request');
    return;
  }

  try {
    const userId = req.user.id;
    const [{ customer_stripe_id }] = await sql`select stripe as customer_stripe_id from users where id = ${userId}`;

    if (!customer_stripe_id) {
      res.json([]);
      return ;
    }

    let invoices = await stripe.invoices.list({
      customer: customer_stripe_id,
      limit: 10,
    });

    if (!invoices) {
      throw new Error(`Error on invoice stripe api for customer ${userId}`);
    }

    invoices = invoices.data.map((invoice) => ({
      id: invoice.id,
      subscription: invoice.subscription,
      status: invoice.status,
      created: invoice.created,
      url: invoice.hosted_invoice_url,
      pdf: invoice.invoice_pdf,
      period: { 
        start: new Date(
          invoice.lines.data[0].period.start * 1000
        ),
        end: new Date(
          invoice.lines.data[0].period.end * 1000
        ),
      }
    }))

    res.json(invoices);
  } catch (e) {
    console.log(e)
    res.status(400).send();
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
