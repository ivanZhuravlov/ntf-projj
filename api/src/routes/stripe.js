require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const sql = require("../pg");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const { log } = require('../utils');
const products = require('../products.json');

const { STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
if (!STRIPE_API_KEY) {
    throw new Error("invalid STRIPE_API_KEY");
}
if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("invalid STRIPE_WEBHOOK_SECRET");
}
const stripe = require("stripe")(STRIPE_API_KEY);

const CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed';


async function handlePayment(session) {
  log(`[Webhook] Handle new intent ${session.id}`);
  const items = await stripe.checkout.sessions.listLineItems(session.id);
  const [stripeProduct] = items.data;
  
  const product = products.find(
    (product) => product.priceId === stripeProduct.price.id
  );

  if(!product) {
    throw new Error(`Invalid product ${stripeProduct.price.id}`);
  }
  
  const customerEmail = session.customer_details.email;
  log(`[Webhook] Customer ${customerEmail} buy ${product.name}`);

  const [user] = await sql`
    select id 
    from users 
    where email = ${customerEmail}
  `;

  const subscriptionEntity = {
    id: uuidv4(),
    user_id: user.id,
    data: JSON.stringify({
      stripe_session_id: session.id,
      product
    }),
    is_active: true,
    created_at: new Date(),
    terminated_at: null,
  };
  await sql`insert into subscriptions ${sql(subscriptionEntity)}`;
}

async function post(req, res) {
  if (!req.body || typeof req.body !== 'object') {
    res.status(400).send('Bad Request');
    return ;
  }

  if (!req.headers || typeof req.headers !== 'object' || !req.headers['stripe-signature']) {
    res.status(400).send('Bad Request');
    return ;
  }
  
  const event = req.body;
  switch (event.type) {
    case CHECKOUT_SESSION_COMPLETED:
      await handlePayment(event.data.object);
      break;
    default:
      console.log(`[Webhook] Unhandled event type ${event.type}`);
  }

  // Return a res to acknowledge receipt of the event
  res.json({received: true});
}

router.route("/").post(express.raw({type: 'application/json'}), post);

module.exports = router;
