const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
  await redisClient.connect();
  await sub.connect();

  await sub.subscribe("insert", async (channel, message) => {
    await redisClient.hSet("values", channel, fib(parseInt(channel)));
  });

  // listen for TERM signal .e.g. kill
  process.once("SIGTERM", async () => {
    await redisClient.disconnect();
    await sub.disconnect();
  });
  // listen for INT signal e.g. Ctrl-C
  process.once("SIGINT", async () => {
    await redisClient.disconnect();
    await sub.disconnect();
  });
})();
