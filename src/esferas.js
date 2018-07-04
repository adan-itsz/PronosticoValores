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
    console.log(datos);
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
            nuevo='https://images.emojiterra.com/mozilla/512px/2b55.png';
            break;
        case '3':
            nuevo='https://images.emojiterra.com/mozilla/512px/1f535.png';
            break;
        case '2':
            nuevo='https://image.flaticon.com/icons/png/512/24/24202.png';
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
