var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var admin = require('firebase-admin')
var serviceAccount = require('./pronosticos-a7e4e-firebase-adminsdk-nhktc-5029e5698d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  'https://pronosticos-a7e4e.firebaseio.com'
});

var dataBase= admin.database();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/cantidad', function (req, res) {
  var ref =dataBase.ref('analitics');
  var referencia=ref.child('registros');
  var referenciaPush=referencia.push();

  referenciaPush.set({
    cantidad: req.body.canti,
    combinacion: req.body.comb
  });
  res.send("dato subido");
});
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
