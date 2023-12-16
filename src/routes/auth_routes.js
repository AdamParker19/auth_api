const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const auth = new authController();

router.post("/signup", async (req, res) => {
  try {
    const userBody = { ...req.body };
    const newUser = await auth.signup(userBody);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => auth.signIn(req, res));
router.get("/logout", async (req, res) => auth.signOut(req, res));

module.exports = router;
