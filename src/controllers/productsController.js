const axios = require("axios");
const redisClient = require("../config/databases/redis");

class ProductController {
  constructor() {}

  list = async (req, res) => {
    try {
      redisClient.get("products", async (err, data) => {
        if (err) {
          console.error("***REDIS ERROR***", err.message);
        }

        if (data) {
          // If cached, return the cached data
          const parsedData = JSON.parse(data);
          return res.json(parsedData);
        } else {
          console.log("not in cache");
          const { data } = await axios.get(`${process.env.PRODUCTS_URL}`);
          //caching products data for next 24 hours
          redisClient.setex("products", 86400, JSON.stringify(data.products));
          res.status(201).send(data.products);
        }
      });
    } catch (error) {
      console.error("***Product List Error****", error.message);
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = ProductController;
