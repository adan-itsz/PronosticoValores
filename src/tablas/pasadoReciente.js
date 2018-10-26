import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FilaEsfera from '../esferas.js'

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
          //salto 6
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],6),d2:this.ultimoValor(this.state.datos[1],6),d3:this.ultimoValor(this.state.datos[2],6),
    d4:this.ultimoValor(this.state.datos[3],6),d5:this.ultimoValor(this.state.datos[4],6), salto:5});
            //salto 7
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],7),d2:this.ultimoValor(this.state.datos[1],7),d3:this.ultimoValor(this.state.datos[2],7),
    d4:this.ultimoValor(this.state.datos[3],7),d5:this.ultimoValor(this.state.datos[4],7), salto:6});
            //salto 8
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],4),d2:this.ultimoValor(this.state.datos[1],8),d3:this.ultimoValor(this.state.datos[2],8),
    d4:this.ultimoValor(this.state.datos[3],4),d5:this.ultimoValor(this.state.datos[4],8), salto:7});
            //salto 9
    filas=filas.concat({d1:this.ultimoValor(this.state.datos[0],9),d2:this.ultimoValor(this.state.datos[1],9),d3:this.ultimoValor(this.state.datos[2],9),
    d4:this.ultimoValor(this.state.datos[3],9),d5:this.ultimoValor(this.state.datos[4],9), salto:8});
    this.contarEsferas(filas);
    this.setState({
      itemsTabla:filas
    })
  }

  contarEsferas=(filas)=>{//hace conteo de veces que se repite un numero por digito en diferentes saltos
    let numeros=filas;
    var d1={cero:0,uno:0,dos:0,tres:0,cuatro:0,cinco:0,seis:0,siete:0,ocho:0,nueve:0};
    var d2={cero:0,uno:0,dos:0,tres:0,cuatro:0,cinco:0,seis:0,siete:0,ocho:0,nueve:0};
    var d3={cero:0,uno:0,dos:0,tres:0,cuatro:0,cinco:0,seis:0,siete:0,ocho:0,nueve:0};
    var d4={cero:0,uno:0,dos:0,tres:0,cuatro:0,cinco:0,seis:0,siete:0,ocho:0,nueve:0};
    var d5={cero:0,uno:0,dos:0,tres:0,cuatro:0,cinco:0,seis:0,siete:0,ocho:0,nueve:0};

    numeros.forEach(it=>{
      switch(it.d1.valor){
        case '0':
          d1.cero++;
          break;
        case '1':
          d1.uno++;
          break;
        case '2':
          d1.dos++;
          break;
        case '3':
          d1.tres++;
          break;
        case '4':
          d1.cuatro++;
          break;
        case '5':
          d1.cinco++;
          break;
        case '6':
          d1.seis++;
          break;
        case '7':
          d1.siete++;
          break;
        case '8':
          d1.ocho++;
          break;
        case '9':
          d1.nueve++;
          break;
          default:
      }
      switch(it.d2.valor){
        case '0':
          d2.cero++;
          break;
        case '1':
          d2.uno++;
          break;
        case '2':
          d2.dos++;
          break;
        case '3':
          d2.tres++;
          break;
        case '4':
          d2.cuatro++;
          break;
        case '5':
          d2.cinco++;
          break;
        case '6':
          d2.seis++;
          break;
        case '7':
          d2.siete++;
          break;
        case '8':
          d2.ocho++;
          break;
        case '9':
          d2.nueve++;
          break;
          default:
      }
      switch(it.d3.valor){
        case '0':
          d3.cero++;
          break;
        case '1':
          d3.uno++;
          break;
        case '2':
          d3.dos++;
          break;
        case '3':
          d3.tres++;
          break;
        case '4':
          d3.cuatro++;
          break;
        case '5':
          d3.cinco++;
          break;
        case '6':
          d3.seis++;
          break;
        case '7':
          d3.siete++;
          break;
        case '8':
          d3.ocho++;
          break;
        case '9':
          d3.nueve++;
          break;
          default:
      }
      switch(it.d4.valor){
        case '0':
          d4.cero++;
          break;
        case '1':
          d4.uno++;
          break;
        case '2':
          d4.dos++;
          break;
        case '3':
          d4.tres++;
          break;
        case '4':
          d4.cuatro++;
          break;
        case '5':
          d4.cinco++;
          break;
        case '6':
          d4.seis++;
          break;
        case '7':
          d4.siete++;
          break;
        case '8':
          d4.ocho++;
          break;
        case '9':
          d4.nueve++;
          break;
          default:
      }
      switch(it.d5.valor){
        case '0':
          d5.cero++;
          break;
        case '1':
          d5.uno++;
          break;
        case '2':
          d5.dos++;
          break;
        case '3':
          d5.tres++;
          break;
        case '4':
          d5.cuatro++;
          break;
        case '5':
          d5.cinco++;
          break;
        case '6':
          d5.seis++;
          break;
        case '7':
          d5.siete++;
          break;
        case '8':
          d5.ocho++;
          break;
        case '9':
          d5.nueve++;
          break;
          default:
      }
    })
    var res={d1:d1,d2:d2,d3:d3,d4:d4,d5:d5};
    this.activarEsferas(res);
  }

  activarEsferas=(res)=>{
    var digito1=this.digitoFiltrado(res.d1);
    var digito2=this.digitoFiltrado(res.d2);
    var digito3=this.digitoFiltrado(res.d3);
    var digito4=this.digitoFiltrado(res.d4);
    var digito5=this.digitoFiltrado(res.d5);
    var arrayConsidencias={d1:digito1,d2:digito2,d3:digito3,d4:digito4,d5:digito5};
    this.props.considenciasEsferas(arrayConsidencias);
    this.setState({
      considencias:arrayConsidencias
    })
  }
  digitoFiltrado=(digito)=>{//asigna color a considencia
    var array=[];

      if(this.digitoFiltradoNumero(digito.cero)=='verde'){
        array=array.concat({digito:'0',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.cero)=='rojo'){
        array=array.concat({digito:'0',color:'3'})//falta mas colores
      }
      if(this.digitoFiltradoNumero(digito.uno)=='rojo/amarillo'){
        array=array.concat({digito:'0',color:'4'})//falta mas colores
      }
      //digito1

      if(this.digitoFiltradoNumero(digito.uno)=='verde'){
        array=array.concat({digito:'1',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.uno)=='rojo'){
        array=array.concat({digito:'1',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.uno)=='rojo/amarillo'){
        array=array.concat({digito:'1',color:'4'})//falta mas colores
      }
      ///

      if(this.digitoFiltradoNumero(digito.dos)=='verde'){
        array=array.concat({digito:'2',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.dos)=='rojo'){
        array=array.concat({digito:'2',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.dos)=='rojo/amarillo'){
        array=array.concat({digito:'2',color:'4'})//falta mas colores
      }
      ///digito3

      if(this.digitoFiltradoNumero(digito.tres)=='verde'){
        array=array.concat({digito:'3',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.tres)=='rojo'){
        array=array.concat({digito:'3',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.tres)=='rojo/amarillo'){
        array=array.concat({digito:'3',color:'4'})//falta mas colores
      }

      /////
      if(this.digitoFiltradoNumero(digito.cuatro)=='verde'){
        array=array.concat({digito:'4',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.cuatro)=='rojo'){
        array=array.concat({digito:'4',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.cuatro)=='rojo/amarillo'){
        array=array.concat({digito:'4',color:'2'})//falta mas colores
      }

      //////digito5
      if(this.digitoFiltradoNumero(digito.cinco)=='verde'){
        array=array.concat({digito:'5',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.cinco)=='rojo'){
        array=array.concat({digito:'5',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.cinco)=='rojo/amarillo'){
        array=array.concat({digito:'5',color:'4'})//falta mas colores
      }
      /////

      if(this.digitoFiltradoNumero(digito.seis)=='verde'){
        array=array.concat({digito:'6',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.seis)=='rojo'){
        array=array.concat({digito:'6',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.seis)=='rojo/amarillo'){
        array=array.concat({digito:'6',color:'4'})//falta mas colores
      }
      ////


      if(this.digitoFiltradoNumero(digito.siete)=='verde'){
        array=array.concat({digito:'7',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.siete)=='rojo'){
        array=array.concat({digito:'7',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.siete)=='rojo/amarillo'){
        array=array.concat({digito:'7',color:'4'})//falta mas colores
      }

      ///
      if(this.digitoFiltradoNumero(digito.ocho)=='verde'){
        array=array.concat({digito:'8',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.ocho)=='rojo'){
        array=array.concat({digito:'8',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.ocho)=='rojo/amarillo'){
        array=array.concat({digito:'8',color:'4'})//falta mas colores
      }
      ///

      if(this.digitoFiltradoNumero(digito.nueve)=='verde'){
        array=array.concat({digito:'9',color:'2'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.nueve)=='rojo'){
        array=array.concat({digito:'9',color:'3'})//falta mas colores
      }
      else if(this.digitoFiltradoNumero(digito.nueve)=='rojo/amarillo'){
        array=array.concat({digito:'9',color:'4'})//falta mas colores
      }

    return array;
  }
  digitoFiltradoNumero=(numero)=>{//verde rojo o amarillo/rojo
    if(numero>=2&&numero<3){
      return 'verde';
    }
    else if(numero>=3&&numero<4){
      return 'rojo';
    }
    else if(numero>=5){
      return 'rojo/amarillo';
    }
    else{
      return'none';
    }
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
        <FilaEsfera datosConsidencias={this.state.considencias} tipo={'3'}/>

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
