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
      saltodir: this.props.saltodir,
      resultados:[],
      iniciales:[]
    };
  }

  componentWillMount(){
    var res=this.diferenciaIndividual(this.state.datos,this.state.salto);

    this.setState({
      resultados:res,
    })
  }
  diferenciaIndividual=(array,salto)=>{
    var posicion1 = 0;
    var posicion2 = 0;
    var posicion3 = 0;
    var posicion4 = 0;
    var posicion0 = 0;

    var data=[];
    for(var i=0;i<10;i++){
      if(i!=0){
        switch (this.state.saltodir) {
          case 1:
          posicion0 = 1;
          posicion1 = 2;
          posicion2 = 3;
          posicion3 = 4;
          posicion4 = 0;
          var inicialD1=this.state.datos[1];
          var inicialD2=this.state.datos[2];
          var inicialD3=this.state.datos[3];
          var inicialD4=this.state.datos[4];
          var inicialD5=this.state.datos[0];

          this.setState({
            iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
          })
          break;
          case 2:
          posicion0 = 2;
          posicion1 = 3;
          posicion2 = 4;
          posicion3 = 0;
          posicion4 = 1;
          var inicialD1=this.state.datos[2];
          var inicialD2=this.state.datos[3];
          var inicialD3=this.state.datos[4];
          var inicialD4=this.state.datos[0];
          var inicialD5=this.state.datos[1];
          this.setState({
            iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
          })
          break;
          case 3:
          posicion0 = 3;
          posicion1 = 4;
          posicion2 = 0;
          posicion3 = 1;
          posicion4 = 2;
          var inicialD1=this.state.datos[3];
          var inicialD2=this.state.datos[4];
          var inicialD3=this.state.datos[0];
          var inicialD4=this.state.datos[1];
          var inicialD5=this.state.datos[2];
          this.setState({
            iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
          })
          break;
          case 4:
          posicion0 = 4;
          posicion1 = 0;
          posicion2 = 1;
          posicion3 = 2;
          posicion4 = 3;
          var inicialD1=this.state.datos[4];
          var inicialD2=this.state.datos[0];
          var inicialD3=this.state.datos[1];
          var inicialD4=this.state.datos[2];
          var inicialD5=this.state.datos[3];
          this.setState({
            iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
          })
          break;
          case 5:
          posicion0 = 0;
          posicion1 = 1;
          posicion2 = 2;
          posicion3 = 3;
          posicion4 = 4;
          var inicialD1=this.state.datos[0];
          var inicialD2=this.state.datos[1];
          var inicialD3=this.state.datos[2];
          var inicialD4=this.state.datos[3];
          var inicialD5=this.state.datos[4];
          this.setState({
            iniciales:{d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]}
          })

            break;


        }
        data=data.concat({diferencia:i,d1:this.busquedaDiferencias(array[posicion0],salto,i),
          d2:this.busquedaDiferencias(array[posicion1],salto,i),d3:this.busquedaDiferencias(array[posicion2],salto,i),
          d4:this.busquedaDiferencias(array[posicion3],salto,i),d5:this.busquedaDiferencias(array[posicion4],salto,i) });
      }
    }
    return data;




  }

 busquedaDiferencias=(array,salto,dif)=>{
   for(var i=salto;i<array.length;i++){
     if(this.operacion(parseInt(array[i]),dif)==parseInt(array[i-salto])){
       return i-1;
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
              <Table.HeaderCell>Universo</Table.HeaderCell>
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
