import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';

class ParImpar extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      itemsTabla:[],
      listo:false
    };
  }

  componentWillMount(){
    var datos=this.state.datos;
    var d1=this.conteo(datos[0]);
    var d2=this.conteo(datos[1]);
    var d3=this.conteo(datos[2]);
    var d4=this.conteo(datos[3]);
    var d5=this.conteo(datos[4]);
    var totales={d1:d1,d2:d2,d3:d3,d4:d4,d5:d5};


    this.setState({
      itemsTabla:totales,
      listo:true
    })

  }

  conteo=(array)=>{
    var banParMenor=true;
    var banImparMenor=true;
    var banParMayor=true;
    var banImparMayor=true;
    var imparMayor=0;
    var parMayor=0;
    var imparMayor=0;
    var parMenor=0;
    var imparMenor=0;
    var ban1=false;
    var ban2=false;

    for(var i=0;i<array.length;i++){

      if(array[i]<5){
        if(this.isPar(array[i])){
          banParMenor=false;
          imparMenor=banImparMenor?imparMenor+1:imparMenor;
          imparMayor=banImparMayor?imparMayor+1:imparMayor;
          parMayor=banParMayor?parMayor+1:parMayor;
        }
        else if(!this.isPar(array[i]) ){
          banImparMenor=false;
          parMenor=banParMenor?parMenor+1:parMenor;
          parMayor=banParMayor?parMayor+1:parMayor;
          imparMayor=banImparMayor?imparMayor+1:imparMayor;
        }
        else{
          ban1=true;
          parMayor=banParMayor?parMayor+1:parMayor;
          imparMayor=banImparMayor?imparMayor+1:imparMayor;
          imparMenor=banImparMenor?imparMenor+1:imparMenor;
          parMenor=banParMenor?parMenor+1:parMenor;
        }
      }

      else{

        if(this.isPar(array[i])){
          banParMayor=false;
          imparMayor=banImparMayor?imparMayor+1:imparMayor;
          imparMenor=banImparMenor?imparMenor+1:imparMenor;
          parMenor=banParMenor?parMenor+1:parMenor;

        }
        else if(!this.isPar(array[i])){
          banImparMayor=false;
          parMayor=banParMayor?parMayor+1:parMayor;
          parMenor=banParMenor?parMenor+1:parMenor;
          imparMenor=banImparMenor?imparMenor+1:imparMenor;
        }
        else{
          ban2=true;
          parMayor=banParMayor?parMayor+1:parMayor;
          imparMayor=banImparMayor?imparMayor+1:imparMayor;
          imparMenor=banImparMenor?imparMenor+1:imparMenor;
          parMenor=banParMenor?parMenor+1:parMenor;
        }
      }

      if(ban1 &&ban2){
        break;
      }

    }

    var arrayResult={parMenor:parMenor,imparMenor:imparMenor,parMayor:parMayor,imparMayor:imparMayor};
    return arrayResult;
  }

  isPar=(valor)=>{
    if(valor%2==0){
      return true;
    }
    else{
      return false;
    }
  }


    render(){
      var listo=this.state.listo;
      return (
        <div>
      {listo==true
        ?
          <Table compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tipo</Table.HeaderCell>
                <Table.HeaderCell>D1| Sin aparecer</Table.HeaderCell>
                <Table.HeaderCell>D2| Sin aparecer</Table.HeaderCell>
                <Table.HeaderCell>D3| Sin aparecer</Table.HeaderCell>
                <Table.HeaderCell>D4| Sin aparecer</Table.HeaderCell>
                <Table.HeaderCell>D5| Sin aparecer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Par menor 5</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d1.parMenor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d2.parMenor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d3.parMenor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d4.parMenor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d5.parMenor}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Impar menor 5</Table.Cell>
                  <Table.Cell>{this.state.itemsTabla.d1.imparMenor}</Table.Cell>
                  <Table.Cell>{this.state.itemsTabla.d2.imparMenor}</Table.Cell>
                  <Table.Cell>{this.state.itemsTabla.d3.imparMenor}</Table.Cell>
                  <Table.Cell>{this.state.itemsTabla.d4.imparMenor}</Table.Cell>
                  <Table.Cell>{this.state.itemsTabla.d5.imparMenor}</Table.Cell>
                </Table.Row>

              <Table.Row>
                <Table.Cell>Par mayor o igual 5</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d1.parMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d2.parMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d3.parMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d4.parMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d5.parMayor}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Impar mayor o igual 5</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d1.imparMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d2.imparMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d3.imparMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d4.imparMayor}</Table.Cell>
                <Table.Cell>{this.state.itemsTabla.d5.imparMayor}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          :<div></div>
       }
       </div>
      )
    };
}


export default ParImpar;
