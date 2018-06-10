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
import AddIcon from '@material-ui/icons/Add';

class SidebarIzquierda extends Component {
  constructor(props){
    super()
  this.state = {
    open: false,
    visible: false ,
    itemsTabla:[]
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

  render() {
    let terminado=this.state.itemsTabla.length>0;
    const { visible } = this.state
    return (
      <div>
        <div className="topBar">
          <button className="btn-sidebar" onClick={this.toggleVisibility}><Icon name='content' size='big'/></button>
        </div>
        <div className='sideBar-contenedor'>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide out' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='line chart' />
              Seccion 2
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
                            <AddIcon />
                          </Button>
                      </DialogContent>
                  </Dialog>
                :<div></div>
            }
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="contenidoBarra">
                  <Pronostico RetornoLista={this.getLista} />
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
