'use strict'
const dotenv = require("dotenv");
dotenv.config();
const user = "Basic " + new Buffer.from(process.env.OPENIMIS_USER+ ":" +process.env.OPENIMIS_PASSWORD).toString("base64");

exports.user = user
