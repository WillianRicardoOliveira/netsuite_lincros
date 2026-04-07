require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    token: process.env.TOKEN
};