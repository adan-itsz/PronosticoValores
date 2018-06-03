import React, { Component } from 'react';
import fetch from 'node-fetch';
import * as d3 from 'd3-request';
import SidebarIzquierda from './sideBar.js';
import './index.css';
import { Header, Icon } from 'semantic-ui-react';
import MenorFrecuenciaTabla from './tablas/tablaMenorFrecuencia.js';
import TablaRepeticion from './tablas/tablaRepeticion.js';
import MenorFrecuenciaParesTabla from './tablas/tablaParesMenorFrecuencia.js'
class Pronostico extends Component {

  constructor(props) {
      super(props);
      this.state = {
        datos: []
      }


    }
componentWillMount() {
      var universo = 500;                     ///universo

        var R1=[];
        var R2=[];
        var R3=[];
        var R4=[];
        var R5=[];
        var matriz=[];
        var count = 0
        var coutn = 0
        var self=this;
        var promise =new Promise(
          function(resolve,reject){
            d3.csv('http://www.pronosticos.gob.mx/Documentos/Historicos/Tris.csv',(data)=> {
            for(var d of data) {
                R1.push(d.R1);
                R2.push(d.R2);
                R3.push(d.R3);
                R4.push(d.R4);
                R5.push(d.R5);
            }
            resolve(matriz.push(R1),
            matriz.push(R2),
            matriz.push(R3),
            matriz.push(R4),
            matriz.push(R5));

          //  for (var i = 0; i < matriz.length; i++) {         //repetimos los algoritos por cada columna
            //  console.log("Columa "+(i+1))

              //  this.NoAparece(matriz[i])
              //  this.MenosAparece(matriz[i])
              //  this.DobleRepeticion(matriz[i])

          //  }
          //  this.Pares(matriz);

          });
          }
        )
        promise.then(function(){

          self.setState({
            datos:matriz
          });

          console.log(matriz)
        })

    }

Pares(matriz){        //algoritmo para juntar la columa 1 y 2 y columna 4 y 5
  var Array1 = matriz[0];
  var Array2 = matriz[1];
  var Array4 = matriz[3];
  var Array5 = matriz[4];

  var ArrayNuevo1 = [];
  var ArrayNuevo2 = [];


  for (var i = 0; i < Array1.length; i++) {

    if(Array1[i]=="0"){                             //si en la primer columna se encuentra el cero solo agrear el valor de la segunda coumna
        ArrayNuevo1[i] =  Array2[i].toString();     //esto para agregar 0,1,2,3,4 ..  en vez de 00,01,02,03,04

    }
    else {
      ArrayNuevo1[i] = Array1[i].toString()+ Array2[i].toString();      //se crea un nuevo arreglo de pares


    }
    if(Array4[i] == "0"){                           //mismo procedimiento que el de arriba pero en columna 4 y 5
      ArrayNuevo2[i] = Array5[i].toString();

    }
    else {
      ArrayNuevo2[i] = Array4[i].toString() + Array5[i].toString();       // se crea un nuevo arreglo de pares


    }

  }
  console.log("Pares que no aparece en la columa 1 y 2");
  this.NoAparecePares(ArrayNuevo1);
  console.log("Pares que Menos aparece en la columa 1 y 2");
  this.MenosAparece(ArrayNuevo1);

  console.log("Pares que no aparece en la columa 4 y 5");
  this.NoAparecePares(ArrayNuevo2);
  console.log("Pares que Menos aparece en la columa 4 y 5");
  this.MenosAparece(ArrayNuevo2);


}

DobleRepeticion(Array){       //algoritmo para saber cuando hubo una doble repeticion

    var Aux = 0;
    var num;

    for (var i = 0; i <= Array.length; i++) {

      if (Array[i] == Array[i+1]) {   //encuentra una repeticion
        if(Aux==0){
          num = i;          // Guarda la primer vez que se encuentra una repeticion
        }
        Aux ++;     //todas las repeticiones

      }

    }

  console.log("Total de repeticiones : " +Aux   );  //total repeticiones
  console.log("ultima repeticione : " +num   );  //ultima repeticion

}

NoAparece(Array){     //algoritmo sencillo de no aparece

  for (var i = 0; i <= 9; i++) {

    if(Array.includes(i.toString())){     //busca que numero del 0 al 9 no esta en el array
    }
    else{
      console.log("NO esta el "+i)    //imprime del 0 al 9 el que no esta

    }

  }

}

NoAparecePares(Array){      //algoritmo par de no aparece
                          //primero declaramos todos los pares posibles para poder saber cual no esta
  var ArrayAux =         ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"];

  for (var i = 0; i <= ArrayAux.length-1; i++) {

    if(Array.includes(ArrayAux[i])){
    }
    else{
      console.log("NO esta el "+ArrayAux[i])    //imprime el que no esta

    }

  }

}

 MenosAparece(array){       //algoritmo que cuenta cada aparicion de un digito
    if (array.length == 0)
        return null;

    var modeMap = [],
        maxEl = array[0],
        maxCount = 1;

    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];

        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;

        if (modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
        else if (modeMap[el] == maxCount)
        {
            maxEl += '&' + el;
            maxCount = modeMap[el];
        }
    }

    console.log(modeMap);       //concentrado de las veces que se repite un numero
    console.log("Menos ocurrencia "+ this.arrayMinIndex(modeMap));
 }

 getAllIndexes(arr, val) {
    var indexes = [], i = -1;   //pasa el valor menor y saca los indices de todos los que tienen el valor minimo
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

arrayMinIndex(array) {
  console.log(array);
  return this.getAllIndexes(array, Math.min.apply(Math,array.filter(n => !isNaN(n))));  //saca el valor minimo del arreglo y lo pasa a otro metodo para guardar el index
}


  render() {
    let terminado=this.state.datos.length>0;
    return (
      <div className="principal">
          <div className="header">
            <Header as='h2'>
              <Icon name='quote right' />
              <Header.Content>Menor o nula frecuencia en dígitos</Header.Content>
            </Header>
          </div>

          <div className="contenidoTablas">
            { terminado==true
              ?<MenorFrecuenciaTabla datos={this.state.datos}/>
              : <div></div>
            }
          </div>

          <div className="header">
            <Header as='h2'>
              <Icon name='reply all' />
              <Header.Content>  Repetición de dígitos</Header.Content>
            </Header>
          </div>

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticion datos={this.state.datos}/>
              : <div></div>
            }
          </div>

          <div className="header">
            <Header as='h2'>
              <Icon name='hand peace' />
              <Header.Content>Menor frecuencia pares</Header.Content>
            </Header>
          </div>

          <div className="contenidoTablas">
            { terminado==true
              ?<MenorFrecuenciaParesTabla datos={this.state.datos}/>
              : <div></div>
            }
          </div>
      </div>
    );
  }
}

export default Pronostico;
