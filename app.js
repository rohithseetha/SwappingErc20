var express = require('express')
var app = express()
var request = require('request');
var fs = require('fs');


var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    // router = express.Router(),
    bodyParser = require('body-parser');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);


app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  

app.get('/api/v1/quote', function (req, res) {
console.log(req.query.fromTokenAddress);

var options = {
  'method': 'GET',
  'url': 'https://api.1inch.exchange/v3.0/56/quote?fromTokenAddress='+req.query.fromTokenAddress+'&toTokenAddress='+req.query.toTokenAddress+'&amount='+req.query.amount+'',
  'headers': {
    'Cookie': '__cfduid=d62511fa14bb1099862634eac9e33b5f51616315932'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  res.send(response.body)
});
});

app.listen(3000);