var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    global.db.findAll((e, docs) => {
        if (e) {
            return console.log(e);
        }
        res.render('index', { title: 'Lista de Clientes', docs: docs });
    });
});

router.get('/cadastrar', function (req, res, next) {
    res.render('cadastrar', {
        title: 'Novo Cadastro',
        doc: { nome: '', idade: '', sexo: '', uf: '' },
        action: '/cadastrar',
    });
});

router.post('/cadastrar', function (req, res, next) {
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var uf = req.body.uf;
    var sexo = req.body.sexo;
    global.db.insertOne({ nome, idade, uf, sexo }, (err, result) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    global.db.deleteOne(id, (e, r) => {
        if (e) {
            return console.log(e);
        }
        res.redirect('/');
    });
});

router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    global.db.findOne(id, (e, docs) => {
        if (e) {
            return console.log(e);
        }
        res.render('new', {
            title: 'Edição de Cliente',
            doc: docs[0],
            action: '/edit/' + docs[0]._id,
        });
    });
});

router.post('/edit/:id', function (req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var sexo = req.body.sexo;
    var uf = req.body.uf;
    global.db.update(id, { nome, idade, sexo, uf }, (e, result) => {
        if (e) {
            return console.log(e);
        }
        res.redirect('/');
    });
});

module.exports = router;
