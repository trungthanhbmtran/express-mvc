const { createClient } = require('redis');

// const client= createClient({
//     url: process.env.REDIS_URL
// });

const client= createClient({
    host:'redis-10464.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 10464,
    password:'jKqTJt78uXm8IBRmQfQxpcu5xoUTi7XG'
});


client.ping(function (err, result) {
    console.log(result);
})

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('ready', () => {
    console.log('Redis to ready');
});

client.on("error", (error) => {
    console.error(error);
});

module.exports = client