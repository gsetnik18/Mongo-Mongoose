var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/Article.js")

router.get("/", function (req, res) {
    res.render('index')
});

router.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("article").each(function (index, element) {
            var resultsStore = {};
            resultsStore.title = $(element).find("h2.esl82me0").text();
            resultsStore.link = 'https://www.nytimes.com' + $(element).find('a').attr('href');
            resultsStore.description = $(element).find("p.e1n8kpyg0").text();
            db.create(resultsStore).then(function (articles) {
                console.log(articles)
            }).catch(function (err) {
                return res.json(err);
            });
        });
        res.send('Scrape Complete');
    });
});

router.get('/articles', function(req, res){
    db.Article.find({saved: false}).then(function(articles){
        res.render('articlelist', {articles: articles });
    }).catch(function(err){
        res.json(err);
    });
});

router.get('/saved', function(req, res){
    db.Article.find({ saved: true }).populate('notes').exec(function(error, articles) {
        res.render('saved', { articles: articles });
    });
});


module.exports = router;