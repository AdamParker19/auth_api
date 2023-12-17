"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongodb_1 = __importDefault(require("./config/databases/mongodb"));
const port = process.env.PORT || 3000;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Middleware for parsing JSON requests
app.use(express_1.default.json());
// Import routes
const routes_1 = require("./routes/routes");
// All api routes
app.use("/api", (0, routes_1.createRoutes)());
app.use("/", (req, res) => res.status(201).send("Welcome"));
app.listen(port, () => {
    (0, mongodb_1.default)();
    console.log(`Server is running on port : ${port}`);
});
