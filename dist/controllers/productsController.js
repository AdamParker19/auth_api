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
const axios_1 = __importDefault(require("axios"));
const redis_1 = __importDefault(require("../config/databases/redis"));
class ProductController {
    constructor() {
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return redis_1.default.get("products", (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error("***REDIS ERROR***", err.message);
                    }
                    if (data) {
                        // If cached, return the cached data
                        const parsedData = JSON.parse(data);
                        return res.json(parsedData);
                    }
                    else {
                        const { data } = yield axios_1.default.get(`${process.env.PRODUCTS_URL}`);
                        //caching products data for next 24 hours
                        redis_1.default.setex("products", 86400, JSON.stringify(data.products));
                        return res.status(201).send(data);
                    }
                }));
            }
            catch (error) {
                console.error("***Product List Error****", error.message);
                res.status(400).send({ message: error.message });
            }
        });
    }
}
exports.default = ProductController;
