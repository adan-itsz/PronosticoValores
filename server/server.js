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
  var dia=/*d.getDate();*/10;
  var ref =dataBase.ref('analitics/registros/'+req.body.anio+'/'+req.body.mes+'/'+req.body.dia);
  var referenciaPush=ref.push();

  referenciaPush.set({
    sorteo:req.body.sorteo,
    modalidad:req.body.modalidad,
    tipo:req.body.tipo,
    combinacion:req.body.combinacion,
    cantidadApostada: req.body.cantidadApostada,
    ganado:req.body.ganado,
    cantidadGanada:req.body.cantidadGanada,
    fecha:req.body.dia+'/'+req.body.mes+'/'+req.body.anio,
    key:referenciaPush.key

  });
  res.send("dato subido");
});

app.post('/evento-updateGan', function (req, res) {

  var dia;
  var mes;
  var anio;
  var cont=0;
  var aux=0;
  var date=req.body.fecha;

  for(var i=0;i<date.length;i++){
      if(date[i]=='/'){
        if(cont==0){
          dia=date.substring(aux,i);
          aux=i+1;
          cont++;
        }
        else if(cont==1){
          mes=date.substring(aux,i);
          aux=i+1;
          cont++;
        }
      }
     else if(i==date.length-1){
        anio=date.substring(aux,date.length);
      }
  }
  var ref =dataBase.ref('analitics/registros/'+anio+'/'+mes+'/'+dia+'/'+req.body.key);
  var cantidad=req.body.ganado?calcularMonto(req.body.tipo,req.body.modalidad,req.body.cantidadApostada):0;

  ref.update({
    ganado:req.body.ganado,
    cantidadGanada:cantidad,
  });
  res.send("dato subido");
});

function calcularMonto(tipo,modalidad,cantidad){
  var monto=0;
  if(tipo==1){
    switch (modalidad) {
      case 1:
        monto=cantidad*50000;
        break;
      case 2:
        monto=cantidad*5000;
        break;
      case 3:
        monto=cantidad*500;
        break;
      case 4:
        monto=cantidad*50;
        break;
      case 5:
        monto=cantidad*50;
        break;
      default:
        monto=cantidad*5;
    }
  }
  else if(tipo==2){
    switch (modalidad) {
      case 1:
        monto=cantidad*80000;
        break;
      case 2:
        monto=cantidad*8000;
        break;
      case 3:
        monto=cantidad*800;
        break;
      case 4:
        monto=cantidad*80;
        break;
      case 5:
        monto=cantidad*80;
        break;
      default:
        monto=cantidad*8;
    }
  }
  console.log(monto);
  return monto;
}

app.post('/eventos-descarga', function (req, res) {
  console.log(req.body.mes);
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
                  resolve(datos=datos.concat([{fecha:snapBaby.val().fecha,sorteo:snapBaby.val().sorteo,modalidad:snapBaby.val().modalidad,tipo:snapBaby.val().tipo,
                    combinacion:snapBaby.val().combinacion,cantidadApostada:snapBaby.val().cantidadApostada,ganado:snapBaby.val().ganado,key:snapBaby.val().key,
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
      console.log(datos.fecha+' '+datos.total);
      res.send(datos);
    }
  )
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
