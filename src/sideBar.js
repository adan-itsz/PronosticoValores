import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Icon, Header } from 'semantic-ui-react'
import './index.css';
import Pronostico from './pantallaPronostico.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Table} from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import {  Input } from 'semantic-ui-react'
import Eventos from './eventos.js';
import * as firebase from 'firebase';
class SidebarIzquierda extends Component {
  constructor(props){
    super()
  this.state = {
    open: false,
    visible: false ,
    itemsTabla:[],
    inputs:0,
    combinacion:'',
    arrayCombinaciones:[],
    openAddCom:true,
    seccion:1,
}
this.getLista = this.getLista.bind(this);

}

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  handleClickOpen = () => {
   this.setState({ open: true });
 };

 handleClose = () => {
   this.setState({ open: false });
 };
 handleClose2 = () => {
   this.setState({ openAddCom: false });
 };
 getLista=(e)=>{

   var count=0;
   var datosUno=[];
   var datosDos=[];
   var datosTres=[];
   var datosCuatro=[];
   var datosCinco=[];
   var datosItem=[];
       for(var i=0;i<5;i++){
         for(var d of e[i]){
           if(count==50){
             count=0;
             break;
           }
           switch (i) {
             case 0:
               datosUno.push(d);
               break;
             case 1:
                 datosDos.push(d);
                 break;
             case 2:
                 datosTres.push(d);
                 break;
             case 3:
                 datosCuatro.push(d);
                 break;
             case 4:
                 datosCinco.push(d);
                 break;
           }
           count++;

         }
       }

      for(var i=0;i<50;i++){
        datosItem=datosItem.concat([{d1:datosUno[i],d2:datosDos[i],d3:datosTres[i],d4:datosCuatro[i],d5:datosCinco[i]}]);
      }
      this.setState({
        itemsTabla:datosItem
      })
 }
 cantidadInputs=()=>{
   if(this.state.inputs<5){
   this.setState({
     inputs: this.state.inputs+1
   })
  }
   else{
     alert("No puedes agregar mas de 5 combinaciones");
   }
 }
 addCombinacion=()=>{

   if(this.state.combinacion.length==5){
   this.setState({
     arrayCombinaciones:this.state.arrayCombinaciones.concat(this.state.combinacion),
     combinacion:''
   })
   }
   console.log(this.state.arrayCombinaciones);
 }
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
cambio=()=>{
  this.setState({
    seccion:1
  })
}
cambio2=()=>{
  this.setState({
    seccion:2
  })
}

  render() {
    let terminado=this.state.itemsTabla.length>0;
    let nuevosDatos=this.state.openAddCom==false;
    const { visible } = this.state;
    let seccion=this.state.seccion;
    const children=[];
      for(var i=0;i<this.state.inputs;i++){

        children.push(<div className="inputDialog"><Input onChange={this.handleRef} value={this.state.combinacion}/> <Button variant="outlined" size="medium" color="primary" onClick={this.addCombinacion}>
        Aceptar
        </Button></div>)
      }
    return (
      <div>
        <div className="topBar">
          <button className="btn-sidebar" onClick={this.toggleVisibility}><Icon name='content' size='big'/></button>
        </div>
        <div className='sideBar-contenedor'>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide out' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home' onClick={this.cambio}>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' onClick={this.cambio2}>
              <Icon name='line chart' />
              Eventos
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='credit card alternative' />
              Seccion 3
            </Menu.Item>
            <Menu.Item name='camera'>
              <button className="btn-sidebar" onClick={this.handleClickOpen}><Icon name='bullhorn' size='big'/></button>
              <div className="labelNav">Historial Resultados</div>
              {terminado==true
                ?<Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">{"Ultimos 50 resultados"}</DialogTitle>
                      <DialogContent>
                          <Table compact>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>D1 </Table.HeaderCell>
                                <Table.HeaderCell>D2 </Table.HeaderCell>
                                <Table.HeaderCell>D3 </Table.HeaderCell>
                                <Table.HeaderCell>D4 </Table.HeaderCell>
                                <Table.HeaderCell>D5 </Table.HeaderCell>

                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {this.state.itemsTabla.map((it,key)=>{
                                return(<Item fila={it} i={key}/>)
                              })}
                            </Table.Body>
                          </Table>
                          <Button variant="fab" mini color="secondary" aria-label="add" >
                          </Button>
                      </DialogContent>
                  </Dialog>
                :<div></div>
            }
            </Menu.Item>

            <Menu.Item name='camera'onClick={() => this.handleItemClick(firebase.auth().signOut())} href="/">Salir</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="contenidoBarra">


                {
                  nuevosDatos && seccion==1 ?
                    <Pronostico RetornoLista={this.getLista} recienIngresados={this.state.arrayCombinaciones} />:
                  seccion==2?
                    <Eventos/>:
                    <div></div>
                }

                  <Dialog
                      open={this.state.openAddCom}
                      onClose={this.handleClose2}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Agregar combinaciones"}</DialogTitle>
                        <DialogContent>

                          {children}
                            <Button variant="fab" mini color="secondary" aria-label="add" onClick={this.cantidadInputs}>
                            </Button>

                        </DialogContent>
                    </Dialog>

              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

class Item extends Component{
  constructor(props){
    super(props)

  }
  handleClick=()=>{
  alert(this.props.i);
  }
  render(){
    return(

        <Table.Row>
          <Table.Cell onClick={this.handleClick}>{this.props.fila.d1} </Table.Cell>
          <Table.Cell>{this.props.fila.d2} </Table.Cell>
          <Table.Cell>{this.props.fila.d3} </Table.Cell>
          <Table.Cell>{this.props.fila.d4} </Table.Cell>
          <Table.Cell>{this.props.fila.d5}</Table.Cell>
        </Table.Row>
    )
  }

}

export default SidebarIzquierda;
