var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;      

var router = express.Router();

var escreveJson = function (obj) {
	fs.writeFileSync('tarefas.json', JSON.stringify(obj));	
}

var leJson = function (obj) {
	return JSON.parse(fs.readFileSync('tarefas.json'));
}

router.post('/escrever', function(req, res) {
    console.log(req.body);
    escreveJson(JSON.stringify(req.body));
    console.log('ESCREVI!');
    res.json({ mensagem: 'ok!' });   
});

router.get('/ler', function(req, res) {
    res.json({ mensagem: leJson() });   
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/main.html'));
});

app.use('/api', router);

app.listen(port);
console.log('Servidor tá rodando na porta ' + port);
