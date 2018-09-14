import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import './index.css';
import axios from 'axios';



class FilaEsfera extends Component{
  constructor(props){
    super(props)

    this.state={
      array:this.props.datosConsidencias,
      uno:[],
      dos:[],
      tres:[],
      cuatro:[],
      cinco:[]
    }
  }
  componentWillMount(){
    console.log("esferas component");
    var tipo=this.props.tipo;
    if(tipo=='1'){
        var arreglo=this.state.array.primero;
        var digito1= this.separarEsferas(arreglo[0]);
        var digito2= this.separarEsferas(arreglo[1]);
        var digito3= this.separarEsferas(arreglo[2]);
        var digito4= this.separarEsferas(arreglo[3]);
        var digito5= this.separarEsferas(arreglo[4]);
        this.setState({
          uno:digito1,
          dos:digito2,
          tres:digito3,
          cuatro:digito4,
          cinco:digito5
        })
   }
   else if(tipo=='2'){
    var value=this.recorrerDatos();
    this.recorrerEnvios(value.d3,3);
    this.setState({
      uno:value.d1,
      dos:value.d2,
      tres:value.d3,
      cuatro:value.d4,
      cinco:value.d5
    })
   }
  }

  recorrerEnvios=(array,digito)=>{

        for(var j=0;j<array.length;j++){
          this.datosAzules(array[j],digito);
        }

  }

  recorrerDatos=()=>{
    var array=this.state.array.frecuencias;
    var d1=[];
    var d2=[];
    var d3=[];
    var d4=[];
    var d5=[];
    array.forEach(it=>{
      //d1
      if(parseInt(it.d1)>=30 && parseInt(it.d1)<45){
        var prediccion=this.operacion(this.state.array.inicial.d1,it.diferencia);
        d1=d1.concat({digito:prediccion,color:'2'});
      }
      else if(parseInt(it.d1)>=45 && parseInt(it.d1)<60){
        var prediccion=this.operacion(this.state.array.inicial.d1,it.diferencia);
        d1=d1.concat({digito:prediccion,color:'3'});
      }
      else if(parseInt(it.d1)>=60){
        var prediccion=this.operacion(this.state.array.inicial.d1,it.diferencia);
        d1=d1.concat({digito:prediccion,color:'4'});
      }

      //d2
      if(parseInt(it.d2)>=30 && parseInt(it.d2)<45){
        var prediccion=this.operacion(this.state.array.inicial.d2,it.diferencia);
        d2=d2.concat({digito:prediccion,color:'2'});
      }
      else if(parseInt(it.d2)>=45 && parseInt(it.d2)<55){
        var prediccion=this.operacion(this.state.array.inicial.d2,it.diferencia);
        d2=d2.concat({digito:prediccion,color:'3'});
      }
      else if(parseInt(it.d2)>=55){
        var prediccion=this.operacion(this.state.array.inicial.d2,it.diferencia);
        d2=d2.concat({digito:prediccion,color:'4'});
      }

      //d3
      if(parseInt(it.d3)>=30 && parseInt(it.d3)<45){
        var prediccion=this.operacion(this.state.array.inicial.d3,it.diferencia);
        d3=d3.concat({digito:prediccion,color:'2'});
      }
      else if(parseInt(it.d3)>=45 && parseInt(it.d3)<55){
        var prediccion=this.operacion(this.state.array.inicial.d3,it.diferencia);
        d3=d3.concat({digito:prediccion,color:'3'});
      }
      else if(parseInt(it.d3)>=55){
        var prediccion=this.operacion(this.state.array.inicial.d3,it.diferencia);
        d3=d3.concat({digito:prediccion,color:'4'});
      }

      //d4
      if(parseInt(it.d4)>=30 && parseInt(it.d4)<45){
        var prediccion=this.operacion(this.state.array.inicial.d4,it.diferencia);
        d4=d4.concat({digito:prediccion,color:'2'});
      }
      else if(parseInt(it.d4)>=45 && parseInt(it.d4)<55){
        var prediccion=this.operacion(this.state.array.inicial.d4,it.diferencia);
        d4=d4.concat({digito:prediccion,color:'3'});
      }
      else if(parseInt(it.d4)>=55){
        var prediccion=this.operacion(this.state.array.inicial.d4,it.diferencia);
        d4=d4.concat({digito:prediccion,color:'4'});
      }

      //d5
      if(parseInt(it.d5)>=30 && parseInt(it.d5)<45){
        var prediccion=this.operacion(this.state.array.inicial.d5,it.diferencia);
        d5=d5.concat({digito:prediccion,color:'2'});
      }
      else if(parseInt(it.d5)>=45 && parseInt(it.d5)<55){
        var prediccion=this.operacion(this.state.array.inicial.d5,it.diferencia);
        d5=d5.concat({digito:prediccion,color:'3'});
      }
      else if(parseInt(it.d5)>=55){
        var prediccion=this.operacion(this.state.array.inicial.d5,it.diferencia);
        d5=d5.concat({digito:prediccion,color:'4'});
      }
    })


    return {d1:d1,d2:d2,d3:d3,d4:d4,d5:d5};//regresa todos los arrays

  }
  separarEsferas=(datosdigitoEsfera)=>{
    var datos=[];
    for(var i=0;i<datosdigitoEsfera.length;i++){
      var dato=datosdigitoEsfera[i];
      datos=datos.concat({digito:dato[0],color:dato[2]});
    }
    return datos
  }

  operacion=(n1,n2)=>{ //inicial, diferencia
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

  render(){
    let terminado=this.state.uno.length>0;
      return(
        <Table.Header>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.HeaderCell>
            {
              this.state.uno.map((it)=>{
              return(<Esfera valores={it}/>)
             })
           }
        </Table.HeaderCell>
        <Table.HeaderCell>{this.state.dos.map((it)=>{
            return(<Esfera valores={it}/>)
           })}
         </Table.HeaderCell>
         <Table.HeaderCell>{this.state.tres.map((it)=>{
             return(<Esfera valores={it}/>)
            })}
          </Table.HeaderCell>
          <Table.HeaderCell>{this.state.cuatro.map((it)=>{
              return(<Esfera valores={it}/>)
             })}
          </Table.HeaderCell>
          <Table.HeaderCell>{this.state.cinco.map((it)=>{
              return(<Esfera valores={it}/>)
             })}
          </Table.HeaderCell>

        </Table.Row>
        </Table.Header>
      )
  }
}
  class Esfera extends Component{
    constructor(props){
      super(props)
      this.state={
        color:'0'
      }
    }
    componentWillMount(){
      var color=this.props.valores.color;
      var nuevo;
      switch (color) {
        case '4':
            nuevo='https://firebasestorage.googleapis.com/v0/b/pronosticos-a7e4e.appspot.com/o/admin%2Frojo-amarillo.png?alt=media&token=8eeb03d4-c44e-4732-8d61-a6a9c52bdfed';
            break;
        case '3':
            nuevo='https://firebasestorage.googleapis.com/v0/b/pronosticos-a7e4e.appspot.com/o/admin%2Froja.png?alt=media&token=1dbd312b-89c6-4c03-9a1b-2a35faa80e39';
            break;
        case '2':
            nuevo='https://firebasestorage.googleapis.com/v0/b/pronosticos-a7e4e.appspot.com/o/admin%2Fverde.png?alt=media&token=b2e440ba-5ba6-4e36-8d82-d7cde3ede409';
            break;
        default:

      }
      this.setState({
        color:nuevo
      })
    }
      render(){
        let colorListo=this.state.color!=0;
        return(
          <div className='conjuntoEsfera'>
          {colorListo
            ?
            <div>
            <img className='esferaImg'src={this.state.color}/>
            <h2 className='numEsfera'>{this.props.valores.digito}</h2>
            </div>
            :<div></div>
          }
          </div>

        )
      }
    }

  export default FilaEsfera;
