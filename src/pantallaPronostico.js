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
      d3.csv('http://www.pronosticos.gob.mx/Documentos/Historicos/Tris.csv',(data)=> {
      data.forEach(function(d) {
        R1.push(d.R1);
        R2.push(d.R2);
        R3.push(d.R3);
        R4.push(d.R4);
        R5.push(d.R5);
      });

    });
    matriz.push(R1);
    matriz.push(R2);
    matriz.push(R3);
    matriz.push(R4);
    matriz.push(R5);

    this.setState({
      datos:matriz
    });

      

    }


  render() {
    return (
      <div className="principal">

      </div>
    );
  }
}

export default Pronostico;
