import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient({
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
export default redisClient;
