import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Header, Icon,Image, Statistic ,Table,Dropdown,Divider} from 'semantic-ui-react';
import {esferasTotales} from './conteoAutomatico.js';

class TablaConcentradoEsferas extends Component{
 constructor(props){
   super(props)
   this.state={
     resultados:[],
     listo:false
   }
 }
  componentWillMount(){
    //incluye frecuencia, numero inmediato y repeticion
    var resultados=esferasTotales(this.props.datos.repeticion,this.props.datos.frecuencia, this.props.datos.numInmediato);
    this.setState({
      resultados:resultados,
      listo:true
    })
  }
render(){

  return(
    <div>
    <Header as='h2'>

      <Header.Content>  </Header.Content>
    </Header>
    <Table celled>
     <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Numero</Table.HeaderCell>
           <Table.HeaderCell>0</Table.HeaderCell>
           <Table.HeaderCell>1</Table.HeaderCell>
           <Table.HeaderCell>2</Table.HeaderCell>
           <Table.HeaderCell>3</Table.HeaderCell>
           <Table.HeaderCell>4</Table.HeaderCell>
           <Table.HeaderCell>5</Table.HeaderCell>
           <Table.HeaderCell>6</Table.HeaderCell>
           <Table.HeaderCell>7</Table.HeaderCell>
           <Table.HeaderCell>8</Table.HeaderCell>
           <Table.HeaderCell>9</Table.HeaderCell>
         </Table.Row>
       </Table.Header>
       { this.state.listo ?
       <Table.Body>
         <ItemTablaEsfera item={this.state.resultados.d1} digito={'d1'}/>
         <ItemTablaEsfera item={this.state.resultados.d2} digito={'d2'}/>
         <ItemTablaEsfera item={this.state.resultados.d3} digito={'d3'}/>
         <ItemTablaEsfera item={this.state.resultados.d4} digito={'d4'}/>
         <ItemTablaEsfera item={this.state.resultados.d5} digito={'d5'}/>
       </Table.Body>
       :<div></div>
     }
     </Table>
     </div>


  )
}
}

class ItemTablaEsfera extends Component{
  render(){
    return(
      <Table.Row>
        <Table.Cell>{this.props.digito}</Table.Cell>
        <Table.Cell>{this.props.item[0]}</Table.Cell>
        <Table.Cell>{this.props.item[1]}</Table.Cell>
        <Table.Cell>{this.props.item[2]}</Table.Cell>
        <Table.Cell>{this.props.item[3]}</Table.Cell>
        <Table.Cell>{this.props.item[4]}</Table.Cell>
        <Table.Cell>{this.props.item[5]}</Table.Cell>
        <Table.Cell>{this.props.item[6]}</Table.Cell>
        <Table.Cell>{this.props.item[7]}</Table.Cell>
        <Table.Cell>{this.props.item[8]}</Table.Cell>
        <Table.Cell>{this.props.item[9]}</Table.Cell>
      </Table.Row>
    );
  }
}
export default TablaConcentradoEsferas;
