import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';

class TablaMuelas extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
    };
  }

  componentWillMount(){
    var datosTotales=[];
    var universo100=[];
    var universo70=[];
    var universo50=[];
    var universo30=[];
    universo30=this.reducirUniverso(30);
    var resultado30=this.DobleRepeticion(universo30);
    datosTotales=datosTotales.concat(resultado30);

    universo50=this.reducirUniverso(50);
    var resultado50=this.DobleRepeticion(universo50);
    datosTotales=datosTotales.concat(resultado50);

    universo70=this.reducirUniverso(70);
    var resultado70=this.DobleRepeticion(universo70);
    datosTotales=datosTotales.concat(resultado70);

    universo100=this.reducirUniverso(100);
    var resultado100=this.DobleRepeticion(universo100);
    datosTotales=datosTotales.concat(resultado100);

    this.setState({
      itemsTabla:datosTotales
    })

  }

  DobleRepeticion(datos){       //algoritmo para saber cuando hubo una doble repeticion
    var digitos=[];
    var itemTabla=[];
    var d=[];
    var Array1=datos[0];
    var Array2 =datos[1];
    var Array3 =datos[2];
    var Array4 = datos[3];
    var Array5 = datos[4];

    for(var it=0;it<=3;it++){
      var Aux = 0;
      var num = 0;
      for (var i = 0; i < Array1.length; i++) {
        if(it == 0){
          if (Array1[i] == Array2[i]) {   //encuentra una repeticion
            if(Aux==0){
              num = i+1;          // Guarda la primer vez que se encuentra una repeticion
            }
            Aux ++;     //todas las repeticiones
          }
        }
        if(it==1) {
          if (Array4[i] == Array5[i]) {   //encuentra una repeticion
            if(Aux==0){
              num = i+1;          // Guarda la primer vez que se encuentra una repeticion
            }
            Aux ++;     //todas las repeticiones
          }
        }
        if(it==2){

          if (Array2[i] == Array3[i]) {   //encuentra una repeticion
            if(Aux==0){
              num = i+1;          // Guarda la primer vez que se encuentra una repeticion
            }
            Aux ++;     //todas las repeticiones
          }

        }
        if (it==3) {
          if (Array3[i] == Array4[i]) {   //encuentra una repeticion
            if(Aux==0){
              num = i+1;          // Guarda la primer vez que se encuentra una repeticion
            }
            Aux ++;     //todas las repeticiones
          }

        }

      }
      if(num == 0 ){
        num = Array1.length;
      }
    digitos=digitos.concat([{tRepeticiones:Aux,sinRepetir:num}]);
    }
    itemTabla=itemTabla.concat([{universo:datos[0].length,d1:digitos[0],d2:digitos[1],d3:digitos[2],d4:digitos[3],d5:digitos[4]}]);
    return itemTabla;
  }

  reducirUniverso=(nUniverso)=>{

    var count=0;
    var datosUno=[];
    var datosDos=[];
    var datosTres=[];
    var datosCuatro=[];
    var datosCinco=[];
    var datosU=[];
        for(var i=0;i<5;i++){
          for(var d of this.state.datos[i]){
            if(count==nUniverso){
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
        datosU.push(datosUno);
        datosU.push(datosDos);
        datosU.push(datosTres);
        datosU.push(datosCuatro);
        datosU.push(datosCinco);
        return datosU;
  }

  handleRef = (c) => {
    var valor=c.target.value;
    if(!isNaN(valor)){
    this.setState({
      universo:valor
    })

    }
    else{
      alert("introduce valor valido");
      this.setState({
      universo:''
      })
    }
}

focus = () => {
  var universoN=[];
  var resultadoN=[];
  var datosTotales=[];
  universoN=this.reducirUniverso(this.state.universo);
  resultadoN=this.DobleRepeticion(universoN);
  datosTotales=datosTotales.concat(resultadoN);
  this.setState({
    itemsTabla:this.state.itemsTabla.concat(datosTotales)
  })
}
    render(){
      return (
        <div className="form-boton">
        <div className="N-universo">
        <Input onChange={this.handleRef} placeholder='N universo' value={this.state.universo}/>
        <Button content='filtrar' onClick={this.focus} />
        </div>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Universo</Table.HeaderCell>
              <Table.HeaderCell>Par Inicial| Sorteo sin repetir</Table.HeaderCell>
                <Table.HeaderCell>Par digitos 2-3| Sorteo sin repetir</Table.HeaderCell>
                  <Table.HeaderCell>Par digitos 3-4| Sorteo sin repetir</Table.HeaderCell>
              <Table.HeaderCell>Par Final | Sorteo sin repetir</Table.HeaderCell>


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

  }
  render(){
    return(

      <Table.Row>
        <Table.Cell>{this.props.fila.universo}</Table.Cell>
        <Table.Cell>{this.props.fila.d1.tRepeticiones} | {this.props.fila.d1.sinRepetir}</Table.Cell>
        <Table.Cell>{this.props.fila.d1.tRepeticiones} | {this.props.fila.d3.sinRepetir}</Table.Cell>
        <Table.Cell>{this.props.fila.d1.tRepeticiones} | {this.props.fila.d4.sinRepetir}</Table.Cell>
        <Table.Cell>{this.props.fila.d2.tRepeticiones} | {this.props.fila.d2.sinRepetir}</Table.Cell>

      </Table.Row>


    )
  }

}
export default TablaMuelas;
