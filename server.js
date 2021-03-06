// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");

// scraping tools
const cheerio = require("cheerio");

const db = require("./models");
const PORT = process.env.PORT || 3000;

// start express
const app = express();

// use morgan
app.use(logger("dev"));

// body-parser for handling submissions
app.use(bodyParser.urlencoded({ extended: true }));

// express
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect mongoose to mongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// GET to scrape npr website
app.get("/scrape", function(req, res) {
    
    app.get("https://www.npr.org/sections/news/").then(function(response) {

    var $ = cheerio.load(response.data);

        $("h2 title").each(function(i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result)
                .then(function(dbArticle) {
                    
                    console.log(dbArticle);
                })
            .catch(function(err) {
                return res.json(err);
            });
        });

        res.send("Scrape Complete");
    });
});

// scrape into mongodb
app.get("/articles", function(req, res) {

    db.Article.find({})
    .then(function(dbArticle) {

        res.json(dbArticle);
    })

    .catch(function(err) {

        res.json(err);
    });
});

app.get("/article/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// server up and running
app.listen(PORT, function() {
    console.log("App is running on " + PORT + "!!");
});
