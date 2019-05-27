var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');
var cors = require('cors');
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var salvarTarefa = function (t) {
  let tarefas = carregarTarefas();
  tarefas.push(t);

  for (var i = 0; i < tarefas.length; i++) {
    tarefas[i].id = i;
  }

  fs.writeFileSync('tarefas.json', JSON.stringify(tarefas));
}

var deletarTarefas = function () {
  fs.writeFileSync('tarefas.json', JSON.stringify([]));
}
var carregarTarefas = function () {
  return JSON.parse(fs.readFileSync('tarefas.json'));
}
var deletarTarefa = function (idTarefa) {
  tarefas = carregarTarefas();

  tarefas.splice(idTarefa, 1);

  for (var i = 0; i < tarefas.length; i++) {
    tarefas[i].id = i;
  }

  fs.writeFileSync('tarefas.json', JSON.stringify(tarefas));

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/main.html'));
});

app.get('/api/tarefas', function (req, res) {
  res.json(carregarTarefas());
});

app.delete('/api/tarefas', function (req, res) {
  deletarTarefas();
  res.json(req.body);
});

app.delete('/api/tarefa', function (req, res) {
  deletarTarefa(req.query.id);
  res.json(req.query);
});

app.get('/api/tarefa/terminar', function (req, res) {
  let tarefas = carregarTarefas();
  for (var i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === parseInt(req.query.id)) {
      console.log('entrou!');
      tarefas[i].terminada = "true";
    }
  }

  for (var i = 0; i < tarefas.length; i++) {
    tarefas[i].id = i;
  }

  fs.writeFileSync('tarefas.json', JSON.stringify(tarefas));
  res.json(req.query);
});
app.get('/api/tarefa/atualizar', function (req, res) {
  let tarefas = carregarTarefas();
  for (var i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === parseInt(req.query.id)) {
      console.log('entrou!');
      tarefas[i].atualiza = "true";
    }
  }

  for (var i = 0; i < tarefas.length; i++) {
    tarefas[i].id = i;
  }

  fs.writeFileSync('tarefas.json', JSON.stringify(tarefas));
  res.json(req.query);
});

app.post('/api/tarefa', function (req, res) {
  salvarTarefa(req.body);
  res.json(req.body);
});


app.post('/api/update', function (req, res) {
  fs.writeFileSync('tarefas.json', JSON.stringify(req.body));
  res.json(req.body);
});

app.listen(port);

console.log('Servidor tá rodando na porta ' + port);
