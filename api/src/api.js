require("dotenv").config();

const { APP_URL, JWT_SECRET, STRIPE_WEBHOOK_SECRET, STRIPE_API_KEY } =
  process.env;

if (!APP_URL) {
  throw new Error("invalid APP_URL");
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error("invalid STRIPE_WEBHOOK_SECRET");
}

if (!STRIPE_API_KEY) {
  throw new Error("invalid STRIPE_API_KEY");
}

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(bodyParser.json());
app.use(
  expressJwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/register", "/login", "/products", "/stripe", "/art",
      { url: /^\/art\/.*/, methods: ['GET'] },
  ],
  })
);

app.use(cors({ methods: ["POST"] }));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send("");
    return;
  }

  next();
});

// User

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

app.use("/profile", require("./routes/profile"));

// Wallet
app.use("/wallet", require("./routes/wallet"));

// Artist
app.use("/artist", require("./routes/artist"));

// Certificate
app.use("/certificate", require("./routes/certificate"));
app.use("/art", require("./routes/art"));

// Stripe
app.use("/products", require("./routes/products"));
app.use("/stripe", require("./routes/stripe"));

// router.get('/invoice', authenticateJWT, async (req, res) => {
//   if (!req.body) {
//     console.log('no body')
//     res.status(400).send('Bad Request');
//     return;
//   }

//   try {
//     const userId = req.user.id;
//     const [{ customer_stripe_id }] = await sql`select stripe as customer_stripe_id from users where id = ${userId}`;

//     if (!customer_stripe_id) {
//       res.json([]);
//       return ;
//     }

//     let invoices = await stripe.invoices.list({
//       customer: customer_stripe_id,
//       limit: 10,
//     });

//     if (!invoices) {
//       throw new Error(`Error on invoice stripe api for customer ${userId}`);
//     }

//     invoices = invoices.data.map((invoice) => ({
//       id: invoice.id,
//       subscription: invoice.subscription,
//       status: invoice.status,
//       created: invoice.created,
//       url: invoice.hosted_invoice_url,
//       pdf: invoice.invoice_pdf,
//       period: {
//         start: new Date(
//           invoice.lines.data[0].period.start * 1000
//         ),
//         end: new Date(
//           invoice.lines.data[0].period.end * 1000
//         ),
//       }
//     }))

//     res.json(invoices);
//   } catch (e) {
//     console.log(e)
//     res.status(400).send();
//   }
// });

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
