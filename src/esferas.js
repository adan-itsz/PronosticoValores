import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import './index.css';



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
  separarEsferas=(datosdigitoEsfera)=>{
    var datos=[];
    for(var i=0;i<datosdigitoEsfera.length;i++){
      var dato=datosdigitoEsfera[i];
      datos=datos.concat({digito:dato[0],color:dato[2]});
    }
    return datos
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
