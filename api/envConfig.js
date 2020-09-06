module.exports = require('dotenv').config({  
  path: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ? __dirname + "/.env.example" : __dirname + "/.env"
});