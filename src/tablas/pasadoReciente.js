import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class PasadoReciente extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      itemsTabla:[]
    };
  }
  componentWillMount() {
    var filas=[];
    var d1=this.ultimoValor(this.state.datos[0],1);
    var d2=this.ultimoValor(this.state.datos[1],1);
    var d3=this.ultimoValor(this.state.datos[2],1);
    var d4=this.ultimoValor(this.state.datos[3],1);
    var d5=this.ultimoValor(this.state.datos[4],1);
    //agregando 1-5 saltos por defecto
    filas=filas.concat({d1:d1,d2:d2,d3:d3,d4:d4,d5:d5,salto:0});
    //salto 2
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],2),d2:this.ultimoValor(this.state.datos[1],2),d3:this.ultimoValor(this.state.datos[2],2),
      d4:this.ultimoValor(this.state.datos[3],2),d5:this.ultimoValor(this.state.datos[4],2), salto:1});
      //salto 3
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],3),d2:this.ultimoValor(this.state.datos[1],3),d3:this.ultimoValor(this.state.datos[2],3),
      d4:this.ultimoValor(this.state.datos[3],3),d5:this.ultimoValor(this.state.datos[4],3), salto:2});
      //salto 4
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],4),d2:this.ultimoValor(this.state.datos[1],4),d3:this.ultimoValor(this.state.datos[2],4),
          d4:this.ultimoValor(this.state.datos[3],4),d5:this.ultimoValor(this.state.datos[4],4), salto:3});
          //salto 5
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],5),d2:this.ultimoValor(this.state.datos[1],5),d3:this.ultimoValor(this.state.datos[2],5),
          d4:this.ultimoValor(this.state.datos[3],5),d5:this.ultimoValor(this.state.datos[4],5), salto:4});

    this.setState({
      itemsTabla:filas
    })
  }

  ultimoValor=(array,salto)=>{
    var i=salto;
    var encontrado=false;
    var arrayFrecuencias=[];
    var numeroActual=array[0];
    var aux;
    var ultimo;
    arrayFrecuencias[0]=0;
    arrayFrecuencias[1]=0;
    arrayFrecuencias[2]=0;
    arrayFrecuencias[3]=0;
    arrayFrecuencias[4]=0;
    arrayFrecuencias[5]=0;
    arrayFrecuencias[6]=0;
    arrayFrecuencias[7]=0;
    arrayFrecuencias[8]=0;
    arrayFrecuencias[9]=0;
    while(encontrado!=true){
      if(array[i]==numeroActual){
        aux=array[i-salto];
        arrayFrecuencias[aux]+=1;
        if(arrayFrecuencias.indexOf(0)!=-1){
          i++;
        }
        else{
          ultimo=aux;
          encontrado=true;
        }
      }
      else{
        i++;
      }
    }
    arrayFrecuencias[aux]=0;
    var resultado={valor:ultimo,acumulado:arrayFrecuencias,iteracciones:i};
    return resultado;
  }

  handleRef = (c) => {
    var valor=c.target.value;
    if(!isNaN(valor)){
    this.setState({
      saltos:valor
    })

    }
    else{
      alert("introduce valor valido");
      this.setState({
      saltos:''
      })
    }
}
focus = () => {
  var filaNueva=[];
  filaNueva=filaNueva.concat({d1:this.ultimoValor(this.state.datos[0],this.state.saltos+1),d2:this.ultimoValor(this.state.datos[1],this.state.saltos+1),d3:this.ultimoValor(this.state.datos[2],this.state.saltos+1),
        d4:this.ultimoValor(this.state.datos[3],this.state.saltos+1),d5:this.ultimoValor(this.state.datos[4],this.state.saltos+1), salto:this.state.saltos})
    this.setState({
      itemsTabla:this.state.itemsTabla.concat(filaNueva)
    })
}
    render(){
      return (
        <div className="form-boton">
        <div className="N-universo">
          <Input onChange={this.handleRef} placeholder='N saltos' value={this.state.saltos}/>
          <Button content='filtrar' onClick={this.focus} />
        </div>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>N° saltos</Table.HeaderCell>
              <Table.HeaderCell>D1</Table.HeaderCell>
              <Table.HeaderCell>D2</Table.HeaderCell>
              <Table.HeaderCell>D3</Table.HeaderCell>
              <Table.HeaderCell>D4</Table.HeaderCell>
              <Table.HeaderCell>D5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.itemsTabla.map((it)=>{
              return(<Item fila={it}/>)
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
      concentrado:[],
      open: false,
    }

  }
  handleClick1=()=>{

  this.setState({
    concentrado:this.props.fila.d1,
     open: true
  });
  }
  handleClick2=()=>{

    this.setState({
      concentrado:this.props.fila.d2,
       open: true
    });

  }
  handleClick3=()=>{

    this.setState({
       open: true,
       concentrado:this.props.fila.d3,
    });
  }
  handleClick4=()=>{
    this.setState({
      concentrado:this.props.fila.d4,
       open: true
    });
  }
  handleClick5=()=>{
    this.setState({
      concentrado:this.props.fila.d5,
       open: true
    });
  }

 handleClose = () => {
   this.setState({ open: false });
 };
  render(){
    let avanzar=this.state.concentrado.acumulado!=undefined;
    return(

        <Table.Row>
          <Table.Cell>{this.props.fila.salto} </Table.Cell>
          <Table.Cell onClick={this.handleClick1}>{this.props.fila.d1.valor} </Table.Cell>
          <Table.Cell onClick={this.handleClick2}>{this.props.fila.d2.valor} </Table.Cell>
          <Table.Cell onClick={this.handleClick3}>{this.props.fila.d3.valor} </Table.Cell>
          <Table.Cell onClick={this.handleClick4}>{this.props.fila.d4.valor} </Table.Cell>
          <Table.Cell onClick={this.handleClick5}>{this.props.fila.d5.valor} </Table.Cell>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"frecuencia pasado reciente individual"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   Se realizaron {this.state.concentrado.iteracciones} iteracciones para encontrar el menor valor
                 </DialogContentText>
                    <Table compact>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Número </Table.HeaderCell>
                          <Table.HeaderCell>Frecuencia</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {avanzar
                          ?this.state.concentrado.acumulado.map((it,key)=>{
                          return(<ItemConcentrado frecuencia={it} i={key}/>)

                        })
                        :<div></div>
                      }
                      </Table.Body>
                    </Table>
                </DialogContent>
            </Dialog>
        </Table.Row>
    )
  }

}
class ItemConcentrado extends Component{
  constructor(props){
    super(props)
  }
    render(){
      return(
        <Table.Row>
          <Table.Cell>{this.props.i} </Table.Cell>
          <Table.Cell>{this.props.frecuencia} </Table.Cell>
        </Table.Row>
      )
    }
  }

export default PasadoReciente;
