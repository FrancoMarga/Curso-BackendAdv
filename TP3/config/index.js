const dotEnv = require('dotenv');
dotEnv.config();

const EXPRESS_CONFIG = {
    PORT: process.env.PORT
};

const MONGO_CONFIG = {
    URI: process.env.MONGO_URI
};
module.exports = {
    MONGO_CONFIG,
    EXPRESS_CONFIG
};