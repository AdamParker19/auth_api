import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserDao from '../daos/userDao';
import signupInterface from '../interfaces/signupInterface';

class AuthController {
  private userDao : UserDao
  
  constructor() {
    this.userDao = new UserDao();
  }

  hashPass = async (password: String) => {
    try {
      const saltRounds : Number = parseInt(process.env.SALT_ROUNDS);
      const salt : String = await bcrypt.genSalt(saltRounds);
      const hash : String = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error("****HASHING ERROR******", error.message);
      throw error;
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } : signupInterface = req.body as signupInterface;

      // Check if the username exists
      const user = await this.userDao.getUser(username);

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
        expiresIn: "24h",
      });

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error("****LOGIN ERROR*****", error.message);
      return res.status(400).json({ message: error.message });
    }
  };

  signUp = async (req: Request, res: Response) => {
    try {
      const {username, password} : signupInterface = req.body as signupInterface
      const hashedPassword = await this.hashPass(password);
      const newUser = await this.userDao.addUser({username, password:hashedPassword});
      res.status(201).send({newUser});
    } catch (error) {
      console.error("***SIGNUP ERROR****", error.message);
      return res.status(400).json({ message: error.message });
    }
  };

  signOut = async (req: Request, res: Response) => {
    try {
      res.redirect("/");
    } catch (error) {
      console.error("***SIGN OUT ERROR****", error.message);
      res.status(400).send({ message: error.message });
    }
  };
}

export default AuthController;
