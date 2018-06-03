import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';

class MenorFrecuenciaParesTabla extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      itemsTabla:[]
    };
  }
  componentWillMount() {
    var datosTotales=[];
    var universo100=[];
    var universo70=[];
    var universo50=[];
    var universo30=[];
    universo30=this.reducirUniverso(100);
    var resultado30=this.Pares(universo30);
    datosTotales=datosTotales.concat(resultado30);
    universo50=this.reducirUniverso(200);
    var resultado50=this.Pares(universo50);
    datosTotales=datosTotales.concat(resultado50);
    universo70=this.reducirUniverso(400);
    var resultado70=this.Pares(universo70);
    datosTotales=datosTotales.concat(resultado70);
    universo100=this.reducirUniverso(500);
    var result=this.Pares(universo100);
    datosTotales=datosTotales.concat(result);
    this.setState({
      itemsTabla:datosTotales
    })
  }

  MenosAparece(array){       //algoritmo que cuenta cada aparicion de un digito
     if (array.length == 0)
         return null;

     var modeMap = [],
         maxEl = array[0],
         maxCount = 1;

     for(var i = 0; i < array.length; i++)
     {
         var el = array[i];

         if (modeMap[el] == null)
             modeMap[el] = 1;
         else
             modeMap[el]++;

         if (modeMap[el] > maxCount)
         {
             maxEl = el;
             maxCount = modeMap[el];
         }
         else if (modeMap[el] == maxCount)
         {
             maxEl += '&' + el;
             maxCount = modeMap[el];
         }
     }

     var res=[];
     res= this.arrayMinIndex(modeMap);
     return res;
  }
  arrayMinIndex(array) {
    console.log(array);
    return this.getAllIndexes(array, Math.min.apply(Math,array.filter(n => !isNaN(n))));  //saca el valor minimo del arreglo y lo pasa a otro metodo para guardar el index
  }
  getAllIndexes(arr, val) {
     var indexes = [], i = -1;   //pasa el valor menor y saca los indices de todos los que tienen el valor minimo
     while ((i = arr.indexOf(val, i+1)) != -1){
         indexes.push(i);
     }
     return indexes;
 }

  Pares(matriz){        //algoritmo para juntar la columa 1 y 2 y columna 4 y 5
    var Array1 = matriz[0];
    var Array2 = matriz[1];
    var Array4 = matriz[3];
    var Array5 = matriz[4];

    var ArrayNuevo1 = [];
    var ArrayNuevo2 = [];
    var par1=[];
    var par2=[];
    var parResultado=[];
    for (var i = 0; i < Array1.length; i++) {

      if(Array1[i]=="0"){                             //si en la primer columna se encuentra el cero solo agrear el valor de la segunda coumna
          ArrayNuevo1[i] =  Array2[i].toString();     //esto para agregar 0,1,2,3,4 ..  en vez de 00,01,02,03,04
      }
      else {
        ArrayNuevo1[i] = Array1[i].toString()+ Array2[i].toString();      //se crea un nuevo arreglo de pares

      }
      if(Array4[i] == "0"){                           //mismo procedimiento que el de arriba pero en columna 4 y 5
        ArrayNuevo2[i] = Array5[i].toString();
      }
      else {
        ArrayNuevo2[i] = Array4[i].toString() + Array5[i].toString();       // se crea un nuevo arreglo de pares
      }

    }
    console.log("Pares que Menos aparece en la columa 1 y 2");
    par1=this.MenosAparece(ArrayNuevo1);
    console.log("Pares que Menos aparece en la columa 4 y 5");
    par2=this.MenosAparece(ArrayNuevo2);
    parResultado=parResultado.concat([{universo:matriz[0].length,par1:par1.toString(),par2:par2.toString()}]);
    return parResultado;

  }

  getAllIndexes(arr, val) {
    var indexes = [], i = -1;   //pasa el valor menor y saca los indices de todos los que tienen el valor minimo
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
  }

  arrayMinIndex(array) {
    return this.getAllIndexes(array, Math.min.apply(Math,array.filter(n => !isNaN(n))));  //saca el valor minimo del arreglo y lo pasa a otro metodo para guardar el index
  }


  reducirUniverso=(nUniverso)=>{

    var count=0;
    var datosUno=[];
    var datosDos=[];
    var datosTres=[];
    var datosCuatro=[];
    var datosCinco=[];
    var datosU=[];
    var self=this;
        for(var i=0;i<5;i++){
          for(var d of self.state.datos[i]){
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
    resultadoN=this.Pares(universoN);
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
              <Table.HeaderCell>Par Inicial</Table.HeaderCell>
              <Table.HeaderCell>Par final</Table.HeaderCell>

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
          <Table.Cell>{this.props.fila.universo} </Table.Cell>
          <Table.Cell>{this.props.fila.par1} </Table.Cell>
          <Table.Cell>{this.props.fila.par2} </Table.Cell>
        </Table.Row>
    )
  }

}

export default MenorFrecuenciaParesTabla;
