var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/Article.js")

router.get("/", function(req, res){
    res.send("Hello!")
});

router.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/").then(function(response){
        var $ = cheerio.load(response.data);
        $("article").each(function(index, element){
            var resultsStore = {};
            resultsStore.title = $(element).find("h2.esl82me0").text();
            db.create(resultsStore).then(function(articles){
                console.log(articles)
            })
        })
    })
})

module.exports = router;