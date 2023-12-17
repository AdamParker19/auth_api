require("dotenv").config();

import mongoConnect from './config/databases/mongodb';
const port = process.env.PORT || 3000;
import express from 'express';
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Import routes
import { createRoutes } from "./routes/routes";

// All api routes
app.use("/api", createRoutes());

app.use("/", (req, res) => res.status(201).send("Welcome"));

app.listen(port, () => {
  mongoConnect();
  console.log(`Server is running on port : ${port}`);
});
