var express = require('express'),
  router = express.Router()/*,
  mongoose = require('mongoose'),
  Article = mongoose.model('Article')*/;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    res.render('index', {
        title: 'Logical quiz',
        version: "0.0.1"
    });

  /*Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });*/
});