const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth_middleware");
const productController = require("../controllers/productsController");

const ProductController = new productController();

router.get("/list", async (req, res) => ProductController.list(req, res));

module.exports = router;
