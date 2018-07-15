import React, { Component } from 'react';
import fetch from 'node-fetch';
import * as d3 from 'd3-request';
import SidebarIzquierda from './sideBar.js';
import './index.css';
import { Header, Icon } from 'semantic-ui-react';
import MenorFrecuenciaTabla from './tablas/tablaMenorFrecuencia.js';
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

class Pronostico extends Component {

  constructor(props) {
      super(props);
      this.state = {
        datos: [],
        value: 0,
        value1: 0,
        open: true
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
        //  console.log(this.state.arrayCombinaciones);
        self.props.RetornoLista(matriz);

          self.setState({
            datos:matriz
          });

          console.log(matriz)
        })

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

  render() {
    let terminado=this.state.datos.length>0;
    const { value } = this.state;
    const { value2 } = this.state;


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
              <Header.Content>  Repeticion</Header.Content>
            </Header>
          </div>
        <Tabs value={this.state.value} onChange={this.handleChange}
              fullWidth  indicatorColor="secondary" textColor="secondary">

              <Tab icon={<Icon name='hand peace' size="large"/>} label="Repeticion consecutiva" ></Tab>
              <Tab icon ={<Icon name='random'size="large"/>} label="Repeticion salto "></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Repeticion doble salto"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Repeticion triple salto"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Repeticion cutriple salto"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="Repeticion quintuple salto"></Tab>
              <Tab icon={<Icon name='fast forward'size="large"/>} label="Repeticion sextuple salto"></Tab>

        </Tabs>

          {value === 0 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticion datos={this.state.datos} salto = {1}/>
                : <div></div>
              }
          </div>}

          {value === 1 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticion datos={this.state.datos} salto = {2}/>
              : <div></div>
            }
          </div>}
          {value ===2 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticion datos={this.state.datos} salto = {3}/>
                : <div></div>
              }
            </div>}
            {value ===3 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<TablaRepeticion datos={this.state.datos} salto = {4}/>
                  : <div></div>
                }
              </div>}
              {value ===4 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<TablaRepeticion datos={this.state.datos} salto = {5}/>
                    : <div></div>
                  }
                </div>}
          {value===5&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticion datos={this.state.datos} salto = {6}/>
                : <div></div>
              }
            </div>
          }
          {value ===6&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticion datos={this.state.datos} salto = {7}/>
                : <div></div>
              }
            </div>


          }

          <div className="header">
            <Header as='h2'>
              <Icon name='reply all' />
              <Header.Content>  Repeticiones Cruzadas </Header.Content>
            </Header>
          </div>
        <Tabs value={this.state.value} onChange={this.handleChange}
              fullWidth  indicatorColor="secondary" textColor="secondary">

              <Tab icon={<Icon name='hand peace' size="large"/>} label="Cruzado Izquierdo" ></Tab>
              <Tab icon ={<Icon name='random'size="large"/>} label="Cruzado Izquierdo salto "></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Cruzado Izquierdo doble salto"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Cruzado Derecha"></Tab>
              <Tab icon={<Icon name='sort amount down'size="large"/>} label="Cruzado Derecha salto"></Tab>
              <Tab icon={<Icon name='step backward'size="large"/>} label="Repeticion doble salto"></Tab>

        </Tabs>

          {value === 0 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {1} dir={"i"}/>
                : <div></div>
              }
          </div>}

          {value === 1 &&

          <div className="contenidoTablas">
            { terminado==true
              ?<TablaRepeticionCruzada datos={this.state.datos} salto = {2} dir={"i"}/>
              : <div></div>
            }
          </div>}
          {value ===2 &&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {3} dir={"i"}/>
                : <div></div>
              }
            </div>}
            {value ===3 &&
              <div className="contenidoTablas">
                { terminado==true
                  ?<TablaRepeticionCruzada datos={this.state.datos} salto = {1} dir={"d"}/>
                  : <div></div>
                }
              </div>}
              {value ===4 &&
                <div className="contenidoTablas">
                  { terminado==true
                    ?<TablaRepeticionCruzada datos={this.state.datos} salto = {2} dir={"d"}/>
                    : <div></div>
                  }
                </div>}
          {value===5&&
            <div className="contenidoTablas">
              { terminado==true
                ?<TablaRepeticionCruzada datos={this.state.datos} salto = {3} dir={"d"}/>
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
                  <Header.Content>DesEmpate Frecuencia</Header.Content>
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
                    <Header.Content>Pasado reciente</Header.Content>
                  </Header>
                </div>
                  <div className="contenidoTablas">
                    { terminado==true
                      ?<PasadoReciente datos={this.state.datos}/>
                      : <div></div>
                    }
                  </div>
                <div className="header">
                  <Header as='h2'>
                    <Icon name='cube' />  <Icon name='cube' />
                    <Header.Content>Numero Faltante</Header.Content>
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
                      <Header.Content>Suma o resta</Header.Content>
                    </Header>
                  </div>
                    <div className="contenidoTablas">
                      { terminado==true
                        ?<SumaOResta datos={this.state.datos} salto={1}/>
                        : <div></div>
                      }
                    </div>



      </div>
    );
  }
}



export default Pronostico;
