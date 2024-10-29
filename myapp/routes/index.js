var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', options = {
    title: 'Nguyen Tuan Trong',
  });
});

router.get('/monitor', function(req, res, next) {
  res.render('monitor', options = {
    title: 'Nguyen Tuan Trong',
  });
});

router.get('/control', function(req, res, next) {
  res.render('control', options = {
    title: 'Nguyen Tuan Trong',
  });
});

router.get('/help', function(req, res, next) {
  res.render('help', options = {
    title: 'Nguyen Tuan Trong',
  });
});

router.get('/reports', function(req, res, next) {
  res.render('reports', options = {
    title: 'Nguyen Tuan Trong',
  });
});

router.get('/settings', function(req, res, next) {
  res.render('settings', options = {
    title: 'Nguyen Tuan Trong',
  });
});

module.exports = router;
