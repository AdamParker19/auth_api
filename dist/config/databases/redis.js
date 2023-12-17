"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
// Create a Redis client
const redisClient = redis_1.default.createClient({
    host: process.env.REDIS_HOST, // Replace with your Redis server host
    port: process.env.REDIS_PORT, // Replace with your Redis server port
    // Add other configuration options as needed
});
redisClient.on("connect", () => {
    console.log(`Redis Connection Established`);
});
// Handle connection errors
redisClient.on("error", (err) => {
    console.error(`Redis Connection Error: ${err}`);
});
redisClient.on("disconnect", () => {
    console.log(`Redis disconnected`);
});
// Export the Redis client
exports.default = redisClient;
