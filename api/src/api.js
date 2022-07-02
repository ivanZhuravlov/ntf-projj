require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

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
const fileupload = require("express-fileupload");
const expressJwt = require("express-jwt");

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(fileupload());
app.use(bodyParser.json());
app.use(
  expressJwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/register", "/login", "/products", "/stripe", "/art", "/kyc/webhook",
      /^\/art\/.*/,
  ],
  })
);

app.use(cors({ methods: ["POST", "GET"] }));

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
app.use("/image", require("./routes/image"));
app.use("/password", require("./routes/password"));

// Wallet
app.use("/wallet", require("./routes/wallet"));

// Artist
app.use("/artist", require("./routes/artist"));

// Certificate
app.use("/certificate", require("./routes/certificate"));
app.use("/royalties", require("./routes/royalties"));
app.use("/art", require("./routes/art"));

// Stripe
app.use("/products", require("./routes/products"));
app.use("/stripe", require("./routes/stripe"));

// Kyc
app.use("/kyc", require("./routes/kyc"));

app.listen(PORT, async () => {  
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
