import React, { Component } from 'react';
import fetch from 'node-fetch';
import * as d3 from 'd3-request';
class Pronostico extends Component {

  constructor(props) {
      super(props);
      this.state = {
        datos: []
      }
    }
      componentWillMount() {
      var R1=[];
      var R2=[];
      var R3=[];
      var R4=[];
      var R5=[];
      var matriz=[];
      var count = 0
      d3.csv('http://www.pronosticos.gob.mx/Documentos/Historicos/Tris.csv',(data)=> {
      for(var d of data) {
        R1.push(d.R1);
        R2.push(d.R2);
        R3.push(d.R3);
        R4.push(d.R4);
        R5.push(d.R5);
        if(count == 10000){
          break;
        }
        else{
          count ++
        }
      }
      matriz.push(R1);
      matriz.push(R2);
      matriz.push(R3);
      matriz.push(R4);
      matriz.push(R5);
      for (var i = 0; i < matriz.length; i++) {
        console.log("Columa "+i)

          this.NoAparece(matriz[i])
          this.MenosAparece(matriz[i])
      }

    });



    this.setState({
      datos:matriz
    });

    console.log(matriz)

    }

NoAparece(Array){

  for (var i = 0; i <= 9; i++) {

    if(Array.includes(i.toString())){
    }
    else{
      console.log("NO esta el "+i)

    }

  }

}



 MenosAparece(array){
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

    console.log("Menos ocurrencia "+ this.arrayMinIndex(modeMap));
}

 getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

arrayMinIndex(array) {
  return this.getAllIndexes(array, Math.min.apply(null, array));
}


  render() {
    return (
      <div className="principal">

      </div>
    );
  }
}

export default Pronostico;
