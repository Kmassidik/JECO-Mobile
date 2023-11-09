const Redis = require("ioredis");
require('dotenv').config()

const redis = new Redis({
  port: 14887, // Redis port
  host: "redis-14887.c259.us-central1-2.gce.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

module.exports = redis;
