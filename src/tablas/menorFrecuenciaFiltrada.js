import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';
import MenorFrecuenciaTabla from './tablaMenorFrecuencia.js';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class FrecuenciaDigitoFiltrada extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      una:[],
      tres:[],
      cinco:[],
      siete:[],
      nueve:[],
      terminado:false,
      value:0
    };
  }

  componentWillMount(){
    this.acomodoDatos();
  }

  acomodoDatos=()=>{
    var d=new Date();
    var una=[];
    var tres=[];
    var cinco=[];
    var siete=[];
    var nueve=[];
    var data=this.state.datos;
    //var hora=d.getHours()+":"+d.getMinutes();
    var hora= moment(d).format('hh:mm:ss');
    var tipoInicial=this.determinarHora(hora);
    switch (tipoInicial) {
      case 1:
        nueve=this.filtrado(0,data);
        siete=this.filtrado(1,data);
        cinco=this.filtrado(2,data);
        tres=this.filtrado(3,data);
        una=this.filtrado(4,data);
        break;
      case 2:
        una=this.filtrado(0,data);
        nueve=this.filtrado(1,data);
        siete=this.filtrado(2,data);
        cinco=this.filtrado(3,data);
        tres=this.filtrado(4,data);
        break;
      case 3:
        tres=this.filtrado(0,data);
        una=this.filtrado(1,data);
        nueve=this.filtrado(2,data);
        siete=this.filtrado(3,data);
        cinco=this.filtrado(4,data);
        break;
      case 4:
        cinco=this.filtrado(0,data);
        tres=this.filtrado(1,data);
        una=this.filtrado(2,data);
        nueve=this.filtrado(3,data);
        siete=this.filtrado(4,data);
        break;
      case 5:
        siete=this.filtrado(0,data);
        cinco=this.filtrado(1,data);
        tres=this.filtrado(2,data);
        una=this.filtrado(3,data);
        nueve=this.filtrado(4,data);
        break;
      case 6:
        nueve=this.filtrado(0,data);
        siete=this.filtrado(1,data);
        cinco=this.filtrado(2,data);
        tres=this.filtrado(3,data);
        una=this.filtrado(4,data);
        break;
      default:

    }
    this.setState({
      una:una,
      tres:tres,
      cinco:cinco,
      siete:siete,
      nueve:nueve,
      terminado:true
    })
  }

  determinarHora=(hora)=>{
    var format = 'hh:mm:ss';
    var time = moment(hora,format)
    var resultado= time.isBefore(moment('01:30:00',format))?1:
    time.isBetween(moment('01:31:00',format),moment('03:30:00',format))?2:
    time.isBetween(moment('03:31:00',format),moment('05:30:00',format))?3:
    time.isBetween(moment('05:31:00',format),moment('07:30:00',format))?4:
    time.isBetween(moment('07:31:00',format),moment('10:30:00',format))?5:
    time.isBetween(moment('10:31:00',format),moment('11:59:00',format))?6:10;


    return resultado;
  }

  filtrado=(tSorteo, array1)=>{
    var arregloFinal=[];
    var array=array1;
    var uno=[];
    var dos=[];
    var tres=[];
    var cuatro=[];
    var cinco=[];
    for(var j=0;j<array.length;j++){
        var arreglo=[];
        var newArray=array[j];
        for(var i=tSorteo;i<newArray.length;i=i+5){
          arreglo=arreglo.concat(newArray[i]);
        }
        switch(j){
          case 0:
            uno=arreglo;
            break;
          case 1:
            dos=arreglo;
            break;
          case 2:
            tres=arreglo;
            break;
          case 3:
            cuatro=arreglo;
            break;
          case 4:
            cinco=arreglo;
            break;

        }
    }
    arregloFinal[0]=uno;
    arregloFinal[1]=dos;
    arregloFinal[2]=tres;
    arregloFinal[3]=cuatro;
    arregloFinal[4]=cinco;

    return arregloFinal;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
    render(){
      let terminado=this.state.terminado;
      var value=this.state.value;
      return (
        <div>
            <Tabs value={this.state.value} onChange={this.handleChange}
                  fullWidth  indicatorColor="secondary" textColor="secondary">
                  <Tab icon={<i class="material-icons">filter_1</i>} label="Total" ></Tab>
                  <Tab icon={<i class="material-icons">filter_1</i>} label="Mediodia" ></Tab>
                  <Tab icon={<i class="material-icons">filter_3</i>} label="De las tres"></Tab>
                  <Tab icon={<i class="material-icons">filter_5</i>} label="Extra"></Tab>chess knight
                  <Tab icon={<i class="material-icons">filter_7</i>} label="De las siete"></Tab>
                  <Tab icon={<i class="material-icons">filter_9</i>} label="Clasico"></Tab>
            </Tabs>

            {value === 0 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<MenorFrecuenciaTabla datos={this.state.datos}/>
                  : <div></div>
                }
            </div>}
            {value === 1 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<MenorFrecuenciaTabla datos={this.state.una}/>
                  : <div></div>
                }
            </div>}

            {value === 2 &&

            <div className="contenidoTablas">
              { terminado==true
                ?<MenorFrecuenciaTabla datos={this.state.tres}/>
                : <div></div>
              }
            </div>}
            {value ===3 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<MenorFrecuenciaTabla datos={this.state.cinco}/>
                  : <div></div>
                }
              </div>}
              {value ===4 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<MenorFrecuenciaTabla datos={this.state.siete}/>
                    : <div></div>
                  }
                </div>}
              {value ===5 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<MenorFrecuenciaTabla datos={this.state.nueve}/>
                    : <div></div>
                  }
                  </div>}
        </div>
      )
    };
}


export default FrecuenciaDigitoFiltrada;
