import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import '../index.css';

class SumaOResta extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      salto:this.props.salto,
      resultados:[],
      iniciales:[]
    };
  }

  componentWillMount(){
    var res=this.diferenciaIndividual(this.state.datos,this.state.salto);
    var inicialD1=this.state.datos[0];
    var inicialD2=this.state.datos[1];
    var inicialD3=this.state.datos[2];
    var inicialD4=this.state.datos[3];
    var inicialD5=this.state.datos[4];

    this.setState({
      resultados:res,
      iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
    })
  }
  diferenciaIndividual=(array,salto)=>{
    var data=[];
    for(var i=0;i<10;i++){

        data=data.concat({diferencia:i,d1:this.busquedaDiferencias(array[0],salto,i),
          d2:this.busquedaDiferencias(array[1],salto,i),d3:this.busquedaDiferencias(array[2],salto,i),
          d4:this.busquedaDiferencias(array[3],salto,i),d5:this.busquedaDiferencias(array[4],salto,i) });

    }
    return data;
  }

 busquedaDiferencias=(array,salto,dif)=>{
   for(var i=salto;i<array.length;i++){
     if(this.operacion(parseInt(array[i]),dif)==parseInt(array[i-salto])){
       return i;
     }
   }
 }

 operacion=(num1,num2)=>{
   var resultado=num1+num2;
   if(resultado>9){
     return resultado-10;
   }
   else if(resultado<0){
     return 10+resultado;
   }
   else{
     return resultado;
   }
 }



    render(){
      return (
        <div className="form-boton">
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Diferencia</Table.HeaderCell>
              <Table.HeaderCell>D1 | Sorteo sin repetir</Table.HeaderCell>
              <Table.HeaderCell>D2 | Sorteo sin repetir</Table.HeaderCell>
              <Table.HeaderCell>D3 | Sorteo sin repetir</Table.HeaderCell>
              <Table.HeaderCell>D4 | Sorteo sin repetir</Table.HeaderCell>
              <Table.HeaderCell>D5 | Sorteo sin repetir</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.resultados.map((it)=>{
              return(<Item fila={it}iniciales={this.state.iniciales}/>)
            })}
          </Table.Body>
        </Table>

        </div>
      )
    };
}

class Item extends Component{
  constructor(props){
    super(props)
    this.state={
      open: false,
    }
  }

  handleClick1=()=>{
    var predecido=this.operacion(this.props.iniciales.d1,this.props.fila.diferencia);
  this.setState({
    open:true,
    prediccion:predecido
  })
  }
  handleClick2=()=>{
    var predecido=this.operacion(this.props.iniciales.d2,this.props.fila.diferencia);
  this.setState({
    prediccion:predecido,
    open:true,
  })
  }
  handleClick3=()=>{
    var predecido=this.operacion(this.props.iniciales.d3,this.props.fila.diferencia);
  this.setState({
    open:true,
    prediccion:predecido
  })
  }
  handleClick4=()=>{
    var predecido=this.operacion(this.props.iniciales.d4,this.props.fila.diferencia);
  this.setState({
    open:true,
    prediccion:predecido
  })
  }

  handleClick5=()=>{
    var predecido=this.operacion(this.props.iniciales.d5,this.props.fila.diferencia);
  this.setState({
    open:true,
    prediccion:predecido
  })
  }

  operacion=(n1,n2)=>{
  var num1=parseInt(n1);
  var num2=parseInt(n2);
    var resultado=num1+num2;
    if(resultado>9){
      return resultado-10;
    }
    else if(resultado<0){
      return 10+resultado;
    }
    else {
      return resultado;
    }
  }


 handleClose = () => {
   this.setState({ open: false });
 };
  render(){
    return(

      <Table.Row>
        <Table.Cell>{this.props.fila.diferencia}</Table.Cell>
        <Table.Cell onClick={this.handleClick1}>{this.props.fila.d1}</Table.Cell>
        <Table.Cell onClick={this.handleClick2}>{this.props.fila.d2}</Table.Cell>
        <Table.Cell onClick={this.handleClick3}>{this.props.fila.d3}</Table.Cell>
        <Table.Cell onClick={this.handleClick4}>{this.props.fila.d4}</Table.Cell>
        <Table.Cell onClick={this.handleClick5}>{this.props.fila.d5}</Table.Cell>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Número a aparecer"}</DialogTitle>
              <DialogContent>
                  <Table compact>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Número </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Cell>{this.state.prediccion} </Table.Cell>

                    </Table.Body>
                  </Table>
              </DialogContent>
          </Dialog>
      </Table.Row>


    )
  }

}


export default SumaOResta;
