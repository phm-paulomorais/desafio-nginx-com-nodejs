const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db2',
  user: 'root',
  password: 'root',
  database: 'nodedb2'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)
var resultadoTabelaPessoas

connection.connect(function(err) {
  if (err) {
    console.log('Erro na conexão')
  } 
  connection.query("create table people(id int not null auto_increment, name varchar(255), primary key(id));", function (err, result, fields) {
    if (err) {
      console.log('Tabela people já existe')
    }
  });

  connection.query("INSERT INTO people(name) values('Paulo Morais')", function (err, result, fields) {
    if (err) {
      console.log('Erro ao inserir dados na tabela people')
    }
  });

  connection.query("SELECT name from people", function (err, result, fields) {
    if (err) {
      console.log('Erro ao realizar a consulta')
    }
    resultadoTabelaPessoas = result;
    var html = '<h1>Full Cycle</h1>' + 'Resultado da tabela people: ' + JSON.stringify(resultadoTabelaPessoas)

    app.get('/', (req,res) => {
      res.send(html)  
    })

  });  


});

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})