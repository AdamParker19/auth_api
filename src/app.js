require("dotenv").config();

const mongoConnect = require("./config/databases/mongodb.js");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Import routes
const auth = require("./routes/auth_routes.js");
const product = require("./routes/product_routes.js");

// Auth routes
app.use("/auth", auth);

//Product routes
app.use("/products", product);

app.use("/", (req, res) => res.status(201).send("Welcome"));

app.listen(port, () => {
  mongoConnect();
  console.log(`Server is running on port : ${port}`);
});
