var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var routes = require("./routes/controllers.js");
var MONGODB_URI = process.env.MONGODB_URI;
var MONGODB_URI = MONGODB_URI || "mongodb://localhost/scraperdb";
mongoose.Promise = global.Promise;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

var PORT = process.env.PORT || 3000;
var app = express();

//STATIC FOLDER
app.use(express.static('public'));
// Middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(routes);
// app.use(htmlRoutes);

app.listen(PORT, function () {
  console.log("App listening at PORT " + PORT)
});