import axios from "axios";
import { Request, Response } from 'express';
import redisClient from "../config/databases/redis";
import { ProductInterface, ProductResponseInterface } from "../interfaces/productInterface";

class ProductController {
  constructor() {}

  list = async (req: Request, res: Response) : Promise<ProductResponseInterface> =>  {
    try {
      return redisClient.get("products", async (err, data) => {
        if (err) {
          console.error("***REDIS ERROR***", err.message);
        }

        if (data) {
          // If cached, return the cached data
          const parsedData = JSON.parse(data);
          return res.json(parsedData);
        } else {
          const { data } : ProductResponseInterface = await axios.get(`${process.env.PRODUCTS_URL}`);
          //caching products data for next 24 hours
          redisClient.setex("products", 86400, JSON.stringify(data.products));
          return res.status(201).send(data);
        }
      });
    } catch (error) {
      console.error("***Product List Error****", error.message);
      res.status(400).send({ message: error.message });
    }
  };
}

export default ProductController;
