var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('cadastrar', {
        title: 'Novo Cadastro',
        doc: { nome: '', idade: '', uf: '', sexo: '' },
        action: '/cadastrar',
    });
});

module.exports = router;
