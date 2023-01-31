const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
  host: "redis-12722.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 12722,
  password: "D2qnpRbbeEft5VTgfJn228rLqZZrFcX0",
});

module.exports = redis;
