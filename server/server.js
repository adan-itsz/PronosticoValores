var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var admin = require('firebase-admin')
var serviceAccount = require('./pronosticos-a7e4e-firebase-adminsdk-nhktc-5029e5698d.json');
var d = new Date();

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

app.post('/evento', function (req, res) {

  var anio= d.getFullYear();
  var mes= d.getMonth();
  var dia=d.getDate();
  var ref =dataBase.ref('analitics/registros/'+anio+'/'+mes+'/'+dia);
  var referenciaPush=ref.push();

  referenciaPush.set({
    sorteo:req.body.sorteo,
    combinacion:req.body.combinacion,
    cantidadApostada: req.body.cantidadApostada,
    cantidadGanada:req.body.cantidadGanada,
    fecha:dia+'/'+mes+'/'+anio

  });
  res.send("dato subido");
});

app.post('/eventos-descarga', function (req, res) {
  var referencia=dataBase.ref('analitics/registros/'+req.body.anio+'/'+req.body.mes);
  var datos=[];
  var promise =new Promise(
    function(resolve,reject){
      referencia.on('value',snapshot=>{
        if(snapshot.exists()){
          snapshot.forEach(snapChild=>{
            if(snapChild.exists()){
              snapChild.forEach(snapBaby=>{
                if(snapBaby.exists()){
                  resolve(datos=datos.concat([{fecha:snapBaby.val().fecha,sorteo:snapBaby.val().sorteo,
                    combinacion:snapBaby.val().combinacion,cantidadApostada:snapBaby.val().cantidadApostada,
                    cantidadGanada:snapBaby.val().cantidadGanada,total:snapBaby.val().cantidadGanada-snapBaby.val().cantidadApostada}]));
                }
                else{
                  resolve(datos=[]);
                }
              })
            }
          })
        }
      })
    }
  )
  promise.then(
    function(){
      res.send(datos);
    }
  )
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
