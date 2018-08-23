const express = require('express');
const http = require('http');
const logger = require('./libs/log'); // логирование в консоль
const morgan = require('morgan'); // логирование запросов с клиента в консоль
const bodyParser = require('body-parser');
var fs = require('fs');


const app = express();
app.set('port', 8080);
app.use(morgan('tiny')); // логирование запросов с клиента в консоль
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  next();
});


const xlsxj = require("xlsx-to-json");

app.post('/getDataBase', (reg, res) => {
  xlsxj({
    input: "db-excel.xlsx",
    output: "db-excel.json",
  }, function(err, result) {
    if(err) {
      res.json(result);
      console.error(err);
    }else {
      res.json(result);
    }
  });
});

app.post('/getBitrixDB', (reg, res) => {
  fs.readFile('companies.json', 'utf8', function(err, contents) {
    res.json(contents);
  });
});


// xlsxj({
//   input: "companies.xlsx",
//   output: "companies.json",
// }, function(err, result) {
//   if(err) {
//     console.error(err);
//   }else {
//     console.error('ok');
//   }
// });




http.createServer(app).listen(8080, () => {
  logger.info('Express server listening on port ' + 8080);
});
