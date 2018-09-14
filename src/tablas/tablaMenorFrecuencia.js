import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Header, Icon } from 'semantic-ui-react';
import FilaEsfera from '../esferas.js'


class MenorFrecuenciaTabla extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:this.props.datos,
      item:'',
      datosUniverso:[],
      itemsTabla:[],
    };
  }
  componentWillMount() {
    var datosTotales=[];
    var datosTotales2 = [];
    var universo100=[];
    var universo70=[];
    var universo50=[];
    var universo30=[];
    var resultado30 = [];

    var copia30 = [];
    var resultado50 = [];
    var resultado70 = [];
    var result = [];
    var sep30 = [];
    var sep50 = [];
    var sep70 = [];
    var sep100 = [];




    universo30=this.reducirUniverso(30);
   resultado30=this.NoAparece(universo30);
    copia30 = this.copyArray(resultado30);
     sep30.push(this.Separador(copia30));

    datosTotales=datosTotales.concat(sep30);
    universo50=this.reducirUniverso(50);
     resultado50=this.NoAparece(universo50);
    const copia50 = this.copyArray(resultado50);
     sep50.push(this.Separador(copia50));


    datosTotales=datosTotales.concat(sep50);
    universo70=this.reducirUniverso(70);
    resultado70=this.NoAparece(universo70);
    var copia70 = this.copyArray(resultado70);
    sep70.push(this.Separador(copia70));

    datosTotales=datosTotales.concat(sep70);
    universo100=this.reducirUniverso(100);
    result=this.NoAparece(universo100);
    var copia100 = this.copyArray(result);
    sep100.push(this.Separador(copia100));


    datosTotales=datosTotales.concat(sep100);

    datosTotales2= datosTotales2.concat(this.SeparadorFinal(resultado30));
    datosTotales2= datosTotales2.concat(this.SeparadorFinal(resultado50));
    datosTotales2= datosTotales2.concat(this.SeparadorFinal(resultado70));
    datosTotales2= datosTotales2.concat(this.SeparadorFinal(result));

//******************************************************************************* aqui estan las dos variables
  var c = this.CompararUniversos(datosTotales);
  var f = this.CompararUniversos(datosTotales2);

  this.props.datosEsferaCallback({primero:c,segundo:f});
    this.setState({
      consideciasUniversos:{primero:c,segundo:f},
      itemsTabla:datosTotales
    })
  }



  menosAparece2(data,ban){   //algoritmo que cuenta cada aparicion de un digito
      var concentrado = [];

         if (data.length == 0)
             return null;

         var modeMap = [],
             maxEl = data[0],
             maxCount = 1;

         for(var i = 0; i < data.length; i++){
             var el = data[i];

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

         if(ban == 1){

         }
         var x = "~"+this.arrayMinIndex(modeMap);
         concentrado["resultado"] = x;
         concentrado.push(modeMap);
       return concentrado;

 }





  menosAparece(data,ban){   //algoritmo que cuenta cada aparicion de un digito
      var concentrado = [];

         if (data.length == 0)
             return null;

         var modeMap = [],
             maxEl = data[0],
             maxCount = 1;

         for(var i = 0; i < data.length; i++){
             var el = data[i];

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

         if(ban == 1){

         }
         var x = this.arrayMinIndex(modeMap)+"~"+this.arrayMinIndex(this.removeSmallest(modeMap));
         concentrado["resultado"] = x;
         concentrado.push(modeMap);
       return concentrado;

 }

 copyArray(arr2){
   var arr = [];
   arr["d1"] = arr2[0].d1;
   arr["d2"] = arr2[0].d2;
   arr["d3"] = arr2[0].d3;
   arr["d4"] = arr2[0].d4;
   arr["d5"] = arr2[0].d5;
   arr["universo"] =arr2[0].universo;
   arr["concentrado"] =arr2[0].concentrado;


return arr;
 }



Comparacion(arr1){
 var num ="";

 var Comprobados = [];
 var cantidad = [];
  var j =0;

  for (var i = 0; i < arr1.length; i++) {

    var marcadord1 = 0;


              if(arr1[i+1] != undefined){

              if (arr1[i].length == 1) {

              if(!Comprobados.includes(arr1[i].toString())){
                if (arr1[i+1].includes(arr1[i].toString())&& arr1[i+1] != null && arr1[i+1] != undefined) {
                  marcadord1 ++;
                  num = arr1[i].toString();

                  }
                }

                }
                else {
                  for (; j < arr1[i].length; j++) {
                    if(!Comprobados.includes(arr1[i][j].toString())){

                    if (arr1[i+1].includes(arr1[i][j].toString())&& arr1[i+1] != null && arr1[i+1] != undefined) {
                      marcadord1 ++;
                      num = arr1[i][j].toString();
                      break;
                      }
                      else {
                        break;
                      }
                    }
                  }
                }
              }
              if(arr1[i+2] != undefined){

                if (arr1[i].length == 1) {

                  if(!Comprobados.includes(arr1[i].toString())){
                      if (arr1[i+2].includes(arr1[i].toString())&& arr1[i+2] != null && arr1[i+2] != undefined) {
                          marcadord1 ++;
                            num = arr1[i].toString();

                        }
                      }
                    }
                else {
                  for (; j < arr1[i].length; j++) {
                    if(!Comprobados.includes(arr1[i][j].toString())){

                    if (arr1[i+2].includes(arr1[i][j].toString())&& arr1[i+2] != null && arr1[i+2] != undefined) {
                          marcadord1 ++;
                          num = arr1[i][j].toString();

                          break;
                          }
                          else {
                            break;
                          }
                        }
                      }
                    }
                }
            if(arr1[i+3] != undefined){

              if (arr1[i].length == 1) {

                if(!Comprobados.includes(arr1[i].toString())){

                    if (arr1[i+3].includes(arr1[i].toString())&& arr1[i+3] != null && arr1[i+3] != undefined) {
                        marcadord1 ++;
                          num = arr1[i].toString();

                      }
                    }
                  }
              else {
                for (; j < arr1[i].length; j++) {
                  if(!Comprobados.includes(arr1[i][j].toString())){

                  if (arr1[i+3].includes(arr1[i][j].toString())&& arr1[i+3] != null && arr1[i+3] != undefined) {
                        marcadord1 ++;
                        num = arr1[i][j].toString();
                        j++;
                        i--;
                        break;
                        }
                        else {
                          j++;
                          i--;
                          break;
                        }
                      }
                    }
                  }
            }


                 if (marcadord1!=0) {
                   Comprobados.push(num);

                   cantidad.push(marcadord1+1);
                 }

      }
      var concentrados = [];
      var arrayindex = [];
      var index = this.arrayMaxIndex(cantidad);
      var n = index.indexOf('|');


      if(index.length != "5"){
      for (var i = 0; i < n; i++) {
        if(index[i+1] == "," || index[i+1] == ' '){
          concentrados.push(Comprobados[index[i]]+"~"+cantidad[index[i]]);

        }
      }
    }
    else{
        index = index.substring(0,n-1);
        concentrados.push(Comprobados[index]+"~"+cantidad[index]);
    }


      return concentrados;

  }




 CompararUniversos(datosTotales){

   var superd1 = [];
   var superd2 = [];
   var superd3 = [];
   var superd4 = [];
   var superd5 = [];

   var bolitas = [];

       for (var i = 0; i < datosTotales.length; i++) {

         var mini1 = [];

           var a = datosTotales[i].d1.replace(/,/g,"");
           var b = datosTotales[i].d2.replace(/,/g,"");
           var c = datosTotales[i].d3.replace(/,/g,"");
           var d = datosTotales[i].d4.replace(/,/g,"");
           var e = datosTotales[i].d5.replace(/,/g,"");
           for (var k = 0; k < a.length; k++) {

             if (a[k+1]== "|") {
               if(a[k-1] == null){
               mini1.push(a[0]);

                }
               superd1.push(mini1);
               var mini1 = [];

               break;
             }
             else {
               mini1.push(a[k]);

             }
           }
           for (var k = 0; k < b.length; k++) {

             if (b[k+1]== "|") {
               if(b[k-1] == null){
               mini1.push(b[0]);
                }
               superd2.push(mini1);
               var mini1 = [];
               break;
             }
             else {
               mini1.push(b[k]);

             }
           }
           for (var k = 0; k < c.length; k++) {

             if (c[k+1]== "|") {
               if(c[k-1] == null){
               mini1.push(c[0]);
                }
               superd3.push(mini1);
               var mini1 = [];

               break;

             }
             else {
               mini1.push(c[k]);

             }
           }
           for (var k = 0; k < d.length; k++) {

             if (d[k+1]== "|") {
               if(d[k-1] == null){
               mini1.push(d[0]);
                }
               superd4.push(mini1);
               var mini1 = [];

               break;

             }
             else {
               mini1.push(d[k]);

             }
           }
           for (var k = 0; k < e.length; k++) {

             if (e[k+1]== "|") {
               if(e[k-1] == null){
               mini1.push(e[0]);
                }
               superd5.push(mini1);
               var mini1 = [];

               break;

             }
             else {
               mini1.push(e[k]);

             }
           }
       }

      bolitas.push(this.Comparacion(superd1));
      bolitas.push(this.Comparacion(superd2));
      bolitas.push(this.Comparacion(superd3));
      bolitas.push(this.Comparacion(superd4));
      bolitas.push(this.Comparacion(superd5));

      return bolitas;
 }

  removeSmallest(array) {
    var min = Math.min.apply(Math,array.filter(n => !isNaN(n)));
    return array.filter(e => e != min);
}

Separador(string){

  var n = string.d1.indexOf('~');
  if(n=>0){
    string.d1 = string.d1.substring(0, n != -1 ? n : string.d1.length);
  }

  var n = string.d2.indexOf('~');
  if(n=>0){
    string.d2 = string.d2.substring(0, n != -1 ? n : string.d2.length);
  }

  var n = string.d3.indexOf('~');
  if(n=>0){
    string.d3 = string.d3.substring(0, n != -1 ? n : string.d3.length);
  }

  var n = string.d4.indexOf('~');
  if(n=>0){
    string.d4 = string.d4.substring(0, n != -1 ? n : string.d4.length);
  }

  var n = string.d5.indexOf('~');
  if(n=>0){
    string.d5 = string.d5.substring(0, n != -1 ? n : string.d5.length);
  }

  return string;
}
SeparadorFinal(string){

  var n = string[0].d1.indexOf('~')+1;
  if(n=>0){
    string[0].d1 = string[0].d1.substring(n != -1 ? n : string[0].d1.length,string[0].d1.length);
  }

  var n = string[0].d2.indexOf('~')+1;
  if(n=>0){
    string[0].d2 = string[0].d2.substring(n != -1 ? n : string[0].d2.length,string[0].d2.length);
  }

  var n = string[0].d3.indexOf('~')+1;
  if(n=>0){
    string[0].d3 = string[0].d3.substring(n != -1 ? n : string[0].d3.length,string[0].d3.length);
  }

  var n = string[0].d4.indexOf('~')+1;
  if(n=>0){
    string[0].d4 = string[0].d4.substring(n != -1 ? n : string[0].d4.length,string[0].d4.length);
  }

  var n = string[0].d5.indexOf('~')+1;
  if(n=>0){
    string[0].d5 = string[0].d5.substring(n != -1 ? n : string[0].d5.length,string[0].d5.length);
  }

  return string;

}

  getAllIndexes(arr, val) {
    var indexes = [], i = -1;   //pasa el valor menor y saca los indices de todos los que tienen el valor minimo
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes+" | "+val;
  }

  arrayMinIndex(array) {
    return this.getAllIndexes(array, Math.min.apply(Math,array.filter(n => !isNaN(n)))) ;  //saca el valor minimo del arreglo y lo pasa a otro metodo para guardar el index
  }


  arrayMaxIndex(array) {
    return this.getAllIndexes(array, Math.max.apply(Math,array.filter(n => !isNaN(n)))) ;  //saca el valor minimo del arreglo y lo pasa a otro metodo para guardar el index
  }






  NoAparece(Array){
    var digitos =[];
    var itemTabla=[];
    var aux = [];

    for (var j = 0; j < Array.length; j++) {
      var digito = [];
      var ban= true;   //algoritmo sencillo de no aparece

    for (var i = 0; i <= 9; i++) {

      if(!Array[j].includes(i.toString())){
        ban = false;
        if(digito != null){
          digito = digito +i+","

        }
        else{
          digito = i+","
        }

       //imprime del 0 al 9 el que no esta

      }

    }
    if(ban){
    aux.push (this.menosAparece(Array[j],0));
    var a = this.menosAparece(Array[j],0);
      digitos.push(a.resultado) ;    //busca que numero del 0 al 9 no esta en el array
    }
    else{
      aux.push (this.menosAparece(Array[j],0));
      var a = this.menosAparece2(Array[j],1);
      digitos.push(digito+"| 0 " + a.resultado);
    }
  }
    itemTabla=itemTabla.concat([{concentrado:aux,universo:Array[0].length,d1:digitos[0].toString(),d2:digitos[1].toString(),d3:digitos[2].toString(),d4:digitos[3].toString(),d5:digitos[4].toString()}]);
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
    resultadoN=this.NoAparece(universoN);
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
        <FilaEsfera datosConsidencias={this.state.consideciasUniversos} tipo={'1'}/>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Universo</Table.HeaderCell>
              <Table.HeaderCell>D1 - (Frecuencia)</Table.HeaderCell>
              <Table.HeaderCell>D2 - (Frecuencia)</Table.HeaderCell>
              <Table.HeaderCell>D3 -(Frecuencia) </Table.HeaderCell>
              <Table.HeaderCell>D4 - (Frecuencia)</Table.HeaderCell>
              <Table.HeaderCell>D5 - (Frecuencia)</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.itemsTabla.map((it,key)=>{
              return(<Item fila={it} i={key}/>)
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
    var individual=this.props.fila.concentrado[0].toString();
    var parts= individual.split(",");
  this.setState({
    concentrado:parts,
     open: true
  });
  }
  handleClick2=()=>{
  //alert("universo "+this.props.fila.universo+" digito "+2);
    var individual=this.props.fila.concentrado[1].toString();
    var parts= individual.split(",");
    this.setState({
      concentrado:parts,
       open: true
    });

  }
  handleClick3=()=>{

    var individual=this.props.fila.concentrado[2].toString();
    var parts= individual.split(",");
    this.setState({
       open: true,
      concentrado:parts
    });
  }
  handleClick4=()=>{
    var individual=this.props.fila.concentrado[3].toString();
    var parts= individual.split(",");
    this.setState({
      concentrado:parts,
       open: true
    });
  }
  handleClick5=()=>{
    var individual=this.props.fila.concentrado[4].toString();
    var parts= individual.split(",");
    this.setState({
      concentrado:parts,
       open: true
    });
  }

 handleClose = () => {
   this.setState({ open: false });
 };

  render(){
    return(

        <Table.Row>
          <Table.Cell>{this.props.fila.universo} </Table.Cell>
          <Table.Cell onClick={this.handleClick1}>{this.props.fila.d1} </Table.Cell>
          <Table.Cell onClick={this.handleClick2}>{this.props.fila.d2} </Table.Cell>
          <Table.Cell onClick={this.handleClick3}>{this.props.fila.d3} </Table.Cell>
          <Table.Cell onClick={this.handleClick4}>{this.props.fila.d4} </Table.Cell>
          <Table.Cell onClick={this.handleClick5}>{this.props.fila.d5}</Table.Cell>


        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Frecuencias individuales"}</DialogTitle>
              <DialogContent>
                  <Table compact>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Número </Table.HeaderCell>
                        <Table.HeaderCell>Frecuencia</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {this.state.concentrado.map((it,key)=>{
                        return(<ItemConcentrado frecuencia={it} i={key}/>)
                      })}
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


export default MenorFrecuenciaTabla;
