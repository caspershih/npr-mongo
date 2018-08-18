// dependencies
const express = require("express");
const bodyParser = requre("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// scraping tools
const cheerio = require("cheerio");

const db = require("/model");
const PORT = 3000;

const app = express();

// use morgan
app.use(logger("dev"));

// body-parser for handling submissions
app.use(bodyParser.urlencoded({ extended: true }));

// express
app.use(express.static("public"));

// connect mongoose to mongoDB
mongoose.connect("mongodb://localhost/nprdb");



// server up and running
app.listen(PORT, function() {
    console.log("App is running on " + PORT + "!!");
});
