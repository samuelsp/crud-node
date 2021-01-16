var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/new', function (req, res, next) {
    res.render('new', { title: 'Formulário do Cliente' });
});

module.exports = router;
