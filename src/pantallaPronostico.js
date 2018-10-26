import React, { Component } from 'react';
import fetch from 'node-fetch';
import * as d3 from 'd3-request';
import SidebarIzquierda from './sideBar.js';
import './index.css';
import { Header, Icon,Dimmer,Loader} from 'semantic-ui-react';
import MenorFrecuenciaTabla from './tablas/tablaMenorFrecuencia.js';
import FrecuenciaDigitoFiltrada from './tablas/menorFrecuenciaFiltrada.js';
import TablaRepeticion from './tablas/tablaRepeticion.js';
import TablaRepeticionCruzada from './tablas/tablaRepeticioncruzada.js'
import DesEmpate from './tablas/DesEmpate.js'
import TablaMuelas from './tablas/tablaMuelas.js'
import NumFaltante from './tablas/NumFaltante.js';
import PasadoReciente from './tablas/pasadoReciente.js'
import MenorFrecuenciaParesTabla from './tablas/tablaParesMenorFrecuencia.js'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {  Input } from 'semantic-ui-react'
import SumaOResta from './tablas/sumaORestaDigito.js'
import Volteados from './tablas/Volteado.js'
import DTCruzado from './tablas/sumaORestaDigitoCruzado.js'
import ParImpar from './tablas/parImpar.js'
import axios from 'axios';
import {sumaRestaAlgoritmo,asociacion,esferasFrecuencia } from './algorithm.js';


class Pronostico extends Component {

  constructor(props) {
      super(props);
      this.state = {
        datos: [],
        value: 0,
        value1: 0,
        open: true,
        bandera:true,
        esferasBandera:false,
        drimmerActivo:true
      }
      this.frecuenciaEsferas = this.frecuenciaEsferas.bind(this);
      this.callbackNumeroInmediato=this.callbackNumeroInmediato.bind(this);

    }
    componentWillMount() {
        var R1=[];
        var R2=[];
        var R3=[];
        var R4=[];
        var R5=[];
        var matriz=[];
        var count = 0
        var coutn = 0
        var self=this;
        //this.inicializarAzules();
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
              if(self.props.recienIngresados!==undefined){
              for(var i=0;i<self.props.recienIngresados.length;i++){
                var elemento=self.props.recienIngresados[i];
                R1.unshift(elemento.substring(0,1));
                R2.unshift(elemento.substring(1,2));
                R3.unshift(elemento.substring(2,3));
                R4.unshift(elemento.substring(3,4));
                R5.unshift(elemento.substring(4,5));
              }
            }
              resolve(matriz.push(R1),
              matriz.push(R2),
              matriz.push(R3),
              matriz.push(R4),
              matriz.push(R5));
          });
          }
        )
        promise.then(function(){
        self.props.RetornoLista(matriz);

        //self.azules(matriz);

          self.setState({
            datos:matriz
          });
        })

    }


  azules=()=>{// considencias repeticion
    var matriz=this.state.datos;
    var repeticion=[];
    var d1=[];
    var d2=[];
    var d3=[];
    var d4=[];
    var d5=[];
    for(var i=1;i<32;i++){
    var datos=sumaRestaAlgoritmo(matriz,i);
    repeticion=repeticion.concat({d1:datos.d1,d2:datos.d2,d3:datos.d3,d4:datos.d4,d5:datos.d5});
    d1=d1.concat(datos.d1);
    d2=d2.concat(datos.d2);
    d3=d3.concat(datos.d3);
    d4=d4.concat(datos.d4);
    d5=d5.concat(datos.d5);
    }
    var asoc=asociacion(d1,d2,d3,d4,d5);
    return asoc;
  }


  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChange2 = (event, value2) => {
    this.setState({ value2 });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleRef = (c) => {
    var valor=c.target.value;
    if(!isNaN(valor)){
    this.setState({
      combinacion:valor
    })

    }
    else{
      alert("introduce valor valido");
      this.setState({
      combinacion:''
      })
    }
}
frecuenciaEsferas=(e)=>{
  var resultado=esferasFrecuencia(e); //frecuencia
  var repeticion = this.azules();//repeticion

  this.setState({
    frecuenciaEsf:resultado,
    repeticionEsf:repeticion,

  },()=>{
    this.props.esferasConsidencias({frecuencia:this.state.frecuenciaEsf,repeticion:this.state.repeticionEsf,numInmediato:this.state.numInmediato})
    this.setState({
      drimmerActivo:false
    })
  })
}

callbackNumeroInmediato=(e)=>{
  console.log(e);//considencia esferas de numero inmediato
  this.setState({
    numInmediato:e
  })
}

  render() {
    let terminado=this.state.datos.length>0;
    const { value } = this.state;
    const { value2 } = this.state;


    return (
      <div className="principal">

          <div className="header">
            <Header as='h2'>
              <Icon name='quote right' />
              <Header.Content>Menor frecuencia</Header.Content>
            </Header>
          </div>
          <div className="contenidoTablas">
            { terminado==true
              ?<FrecuenciaDigitoFiltrada callBackPrincipalEsferas={this.frecuenciaEsferas} datos={this.state.datos}/>
              : <div></div>
            }
          </div>


          <div className="header">
            <Header as='h2'>
              <Icon name='reply all' />
              <Header.Content>  Repeticion</Header.Content>
            </Header>
          </div>
        <Tabs value={this.state.value} onChange={this.handleChange}
              fullWidth  indicatorColor="secondary" textColor="secondary" scrollable scrollButtons="on">

              <Tab icon={<Icon name='hand peace' size="large"/>} label="consecutiva" ></Tab>
              <Tab icon ={<Icon name='random'size="large"/>} label=" salto "></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="doble salto"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="3 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="4 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="5 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="6 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="7 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="8 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="9 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="10 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="11 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="12 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="13 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="14 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="15 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="16 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="17 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="18 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="19 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="20 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="21 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="22 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="23 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="24 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="25 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="26 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="27 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="28 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="29 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="30 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="31 saltos"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="32 saltos"></Tab>

        </Tabs>

          {value === 0 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={1}/>
                : <div></div>
              }
          </div>}

          {value === 1 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<SumaOResta datos={this.state.datos} salto={2}/>
              : <div></div>
            }
          </div>}
          {value ===2 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={3}/>
                : <div></div>
              }
            </div>}
            {value ===3 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<SumaOResta datos={this.state.datos} salto={4}/>
                  : <div></div>
                }
              </div>}
              {value ===4 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<SumaOResta datos={this.state.datos} salto={5}/>
                    : <div></div>
                  }
                </div>}
          {value===5&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={6}/>
                : <div></div>
              }
            </div>
          }
          {value ===6&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={7}/>
                : <div></div>
              }
            </div>
          }

          {value ===7&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={8}/>
                : <div></div>
              }
            </div>
          }
          {value ===8&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={9}/>
                : <div></div>
              }
            </div>
          }
          {value ===9&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={10}/>
                : <div></div>
              }
            </div>
          }

          {value === 10 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={11}/>
                : <div></div>
              }
          </div>}

          {value === 11 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<SumaOResta datos={this.state.datos} salto={12}/>
              : <div></div>
            }
          </div>}
          {value ===12 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={13}/>
                : <div></div>
              }
            </div>}
            {value ===13 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<SumaOResta datos={this.state.datos} salto={14}/>
                  : <div></div>
                }
              </div>}
              {value ===14 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<SumaOResta datos={this.state.datos} salto={15}/>
                    : <div></div>
                  }
                </div>}
          {value===15&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={16}/>
                : <div></div>
              }
            </div>
          }
          {value ===16&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={17}/>
                : <div></div>
              }
            </div>
          }

          {value ===17&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={18}/>
                : <div></div>
              }
            </div>
          }
          {value ===18&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={19}/>
                : <div></div>
              }
            </div>
          }
          {value ===19&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={20}/>
                : <div></div>
              }
            </div>
          }
          {value ===20&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={21}/>
                : <div></div>
              }
            </div>
          }
          {value === 21 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={22}/>
                : <div></div>
              }
          </div>}

          {value === 22 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<SumaOResta datos={this.state.datos} salto={23}/>
              : <div></div>
            }
          </div>}
          {value ===23 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={24}/>
                : <div></div>
              }
            </div>}
            {value ===24 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<SumaOResta datos={this.state.datos} salto={25}/>
                  : <div></div>
                }
              </div>}
              {value ===25 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<SumaOResta datos={this.state.datos} salto={26}/>
                    : <div></div>
                  }
                </div>}
          {value===26&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={27}/>
                : <div></div>
              }
            </div>
          }
          {value ===27&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={28}/>
                : <div></div>
              }
            </div>
          }

          {value ===28&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={29}/>
                : <div></div>
              }
            </div>
          }
          {value ===29&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={30}/>
                : <div></div>
              }
            </div>
          }
          {value ===30&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={31}/>
                : <div></div>
              }
            </div>
          }
          {value ===31&&
            <div className="contenidoTablas">
              { terminado==true
                ?<SumaOResta datos={this.state.datos} salto={32}/>
                : <div></div>
              }
            </div>
          }

          <div className="header">
            <Header as='h2'>
              <Icon name='reply all' />
              <Header.Content>  Repeticiones Cruzadas Izquierda</Header.Content>
            </Header>
          </div>
        <Tabs value={this.state.value2} onChange={this.handleChange2}
              fullWidth  indicatorColor="secondary" textColor="secondary" scrollable scrollButtons="on">

              <Tab icon={<Icon name='hand peace' size="large"/>} label="consecutiva" ></Tab>
              <Tab icon ={<Icon name='random'size="large"/>} label="1 salto "></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="2 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="3 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="4 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="5 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="6 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="7 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="8 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="9 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="10 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="11 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="12 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="13 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="14 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="15 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="16 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="17 saltos"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="18 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="19 saltos"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="20 saltos"></Tab>

        </Tabs>

          {value2 === 0 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {1} dir={"i"}/>
                : <div></div>
              }
          </div>}

          {value2 === 1 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticionCruzada datos={this.state.datos} salto = {2} dir={"i"}/>
              : <div></div>
            }
          </div>}
          {value2 ===2 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {3} dir={"i"}/>
                : <div></div>
              }
            </div>}
            {value2 ===3 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<TablaRepeticionCruzada datos={this.state.datos} salto = {4} dir={"i"}/>
                  : <div></div>
                }
              </div>}
              {value2 ===4 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<TablaRepeticionCruzada datos={this.state.datos} salto = {5} dir={"i"}/>
                    : <div></div>
                  }
                </div>}
          {value2===5&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {6} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===6&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {7} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===7&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {8} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===8&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {9} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2 === 9 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {10} dir={"i"}/>
                : <div></div>
              }
          </div>}

          {value2 === 10 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticionCruzada datos={this.state.datos} salto = {11} dir={"i"}/>
              : <div></div>
            }
          </div>}
          {value2 === 11 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticionCruzada datos={this.state.datos} salto = {12} dir={"i"}/>
              : <div></div>
            }
          </div>}
          {value2 ===12 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {13} dir={"i"}/>
                : <div></div>
              }
            </div>}
            {value2 ===13 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<TablaRepeticionCruzada datos={this.state.datos} salto = {14} dir={"i"}/>
                  : <div></div>
                }
              </div>}
              {value2 ===14 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<TablaRepeticionCruzada datos={this.state.datos} salto = {15} dir={"i"}/>
                    : <div></div>
                  }
                </div>}
          {value2===15&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {16} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===16&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {17} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===17&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {18} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===18&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {19} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===19&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {20} dir={"i"}/>
                : <div></div>
              }
            </div>
          }
          {value2===20&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {21} dir={"i"}/>
                : <div></div>
              }
            </div>
          }

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

            <div className="header">
              <Header as='h2'>
                <Icon name='cube' />  <Icon name='cube' />
                <Header.Content>Repeticion de Muelas</Header.Content>
              </Header>
            </div>
              <div className="contenidoTablas">
                { terminado==true
                  ?<TablaMuelas datos={this.state.datos}/>
                  : <div></div>
                }
              </div>

              <div className="header">
                <Header as='h2'>
                  <Icon name='cube' />  <Icon name='cube' />
                  <Header.Content>General menor frecuencia</Header.Content>
                </Header>
              </div>
                <div className="contenidoTablas">
                  { terminado==true
                    ?<DesEmpate datos={this.state.datos}/>
                    : <div></div>
                  }
                </div>
                <div className="header">
                  <Header as='h2'>
                    <Icon name='cube' />  <Icon name='cube' />
                    <Header.Content>Número inmediato</Header.Content>
                  </Header>
                </div>
                  <div className="contenidoTablas">
                    { terminado==true
                      ?<PasadoReciente considenciasEsferas={this.callbackNumeroInmediato} datos={this.state.datos}/>
                      : <div></div>
                    }
                  </div>
                <div className="header">
                  <Header as='h2'>
                    <Icon name='cube' />  <Icon name='cube' />
                    <Header.Content>General ausente</Header.Content>
                  </Header>
                </div>
                  <div className="contenidoTablas">
                    { terminado==true
                      ?<NumFaltante datos={this.state.datos}/>
                      : <div></div>
                    }
                  </div>

                    <div className="header">
                      <Header as='h2'>
                        <Icon name='cube' />  <Icon name='cube' />
                        <Header.Content>Transposicion ambos sentidos</Header.Content>
                      </Header>
                    </div>
                      <div className="contenidoTablas">
                        { terminado==true
                          ?<Volteados datos={this.state.datos} salto={1}/>
                          : <div></div>
                        }
                      </div>

                      <div className="header">
                        <Header as='h2'>
                          <Icon name='reply all' />
                          <Header.Content>  Correlacion horizonta\\Cruzado Derecho\\ </Header.Content>
                        </Header>
                      </div>
                      <Tabs value={this.state.value} onChange={this.handleChange}
                            fullWidth  indicatorColor="secondary" textColor="secondary">

                            <Tab icon={<Icon name='hand peace' size="large"/>} label=" Derecha salto" ></Tab>
                            <Tab icon ={<Icon name='random'size="large"/>} label=" Derecha doble salto "></Tab>
                            <Tab icon={<Icon name='sort amount down'size="large"/>} label="Derecha triple salto"></Tab>
                            <Tab icon={<Icon name='sort amount down'size="large"/>} label="Derecha cuatriple"></Tab>
                            <Tab icon={<Icon name='sort amount down'size="large"/>} label="Derecha Quintuple"></Tab>

                      </Tabs>

                      {value === 0 &&
                        <div className="contenidoTablas">
                          { terminado==true
                            ?<DTCruzado datos={this.state.datos} salto={1} saltodir = {1}/>
                            : <div></div>
                          }
                      </div>}

                        {value === 1 &&

                        <div className="contenidoTablas">
                          { terminado==true
                            ?<DTCruzado datos={this.state.datos} salto = {1} saltodir = {2}/>
                            : <div></div>
                          }
                        </div>}
                        {value ===2 &&
                          <div className="contenidoTablas">
                            { terminado==true
                              ?<DTCruzado datos={this.state.datos} salto = {1} saltodir={3}/>
                              : <div></div>
                            }
                          </div>}
                          {value ===3 &&
                            <div className="contenidoTablas">
                              { terminado==true
                                ?<DTCruzado datos={this.state.datos} salto = {1} saltodir={4}/>
                                : <div></div>
                              }
                            </div>}
                            {value ===4 &&
                              <div className="contenidoTablas">
                                { terminado==true
                                  ?<DTCruzado datos={this.state.datos} salto = {1} saltodir={5}/>
                                  : <div></div>
                                }
                              </div>}

                    <div className="header">
                      <Header as='h2'>
                        <Icon name='hand peace' />
                        <Header.Content>Par o impar</Header.Content>
                      </Header>
                    </div>

                    <div className="contenidoTablas">
                      { terminado==true
                        ?<ParImpar datos={this.state.datos}/>
                        : <div></div>
                      }

                      </div>

        <Dimmer active={this.state.drimmerActivo} page>
        <Loader>
          <Header as='h2' icon inverted>
            Cargando ....
          </Header>
        </Loader>
        </Dimmer>

      </div>
    );
  }
}



export default Pronostico;
