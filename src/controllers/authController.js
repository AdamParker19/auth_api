const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {}

  hashPass = async (password) => {
    try {
      const saltRounds = process.env.SALT_ROUNDS;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error("****HASHING ERROR******", error.message);
      throw error;
    }
  };

  signIn = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username exists
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Create a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error("****LOGIN ERROR*****", error.message);
      return res.status(400).json({ message: error.message });
    }
  };

  signUp = async (user) => {
    try {
      const password = await this.hashPass(user.password);
      const newUser = new User({ ...user, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("***SIGNUP ERROR****", error.message);
      return res.status(400).json({ message: error.message });
    }
  };

  signOut = async (req, res) => {
    try {
      res.redirect("/");
    } catch (error) {
      console.error("***SIGN OUT ERROR****", error.message);
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = AuthController;
