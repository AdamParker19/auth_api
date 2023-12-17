"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDao_1 = __importDefault(require("../daos/userDao"));
class AuthController {
    constructor() {
        this.hashPass = (password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = parseInt(process.env.SALT_ROUNDS);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                const hash = yield bcrypt_1.default.hash(password, salt);
                return hash;
            }
            catch (error) {
                console.error("****HASHING ERROR******", error.message);
                throw error;
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // Check if the username exists
                const user = yield this.userDao.getUser(username);
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: "Invalid username or password" });
                }
                // Check if the password is correct
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!validPassword) {
                    return res
                        .status(401)
                        .json({ message: "Invalid username or password" });
                }
                // Create a JSON Web Token (JWT)
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "24h",
                });
                // Send the token in the response
                res.json({ token });
            }
            catch (error) {
                console.error("****LOGIN ERROR*****", error.message);
                return res.status(400).json({ message: error.message });
            }
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const hashedPassword = yield this.hashPass(password);
                const newUser = yield this.userDao.addUser({ username, password: hashedPassword });
                res.status(201).send({ newUser });
            }
            catch (error) {
                console.error("***SIGNUP ERROR****", error.message);
                return res.status(400).json({ message: error.message });
            }
        });
        this.signOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.redirect("/");
            }
            catch (error) {
                console.error("***SIGN OUT ERROR****", error.message);
                res.status(400).send({ message: error.message });
            }
        });
        this.userDao = new userDao_1.default();
    }
}
exports.default = AuthController;
