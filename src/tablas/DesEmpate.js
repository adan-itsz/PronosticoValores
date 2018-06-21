import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Header, Icon } from 'semantic-ui-react';


class DesEmpate extends Component{
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
    var universo100=[];
    var universo70=[];
    var universo50=[];
    var universo30=[];

    universo30=this.reducirUniverso(5);
    console.log(this.NoAparece(universo30));
    var resultado30=this.NoAparece(universo30);
    datosTotales=datosTotales.concat(resultado30);
    universo50=this.reducirUniverso(10);
    var resultado50=this.NoAparece(universo50);
    datosTotales=datosTotales.concat(resultado50);
    universo70=this.reducirUniverso(15);
    var resultado70=this.NoAparece(universo70);
    datosTotales=datosTotales.concat(resultado70);
    universo100=this.reducirUniverso(20);
    var result=this.NoAparece(universo100);
    datosTotales=datosTotales.concat(result);

    this.setState({
      itemsTabla:datosTotales
    })
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
         concentrado["resultado"] = this.arrayMinIndex(modeMap);
         concentrado.push(modeMap);
       return concentrado;

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

  NoAparece(Array){
    var ArrayPadre = [];
      for (var i = 0; i < Array[0].length; i++) {
        for (var j = 4; j >= 0; j--) {
          ArrayPadre.push(Array[j][i]);

          }

      }





    var digitos =[];
    var itemTabla=[];
    var aux = [];

    for (var j = 0; j < 1; j++) {
      var digito = [];
      var ban= true;   //algoritmo sencillo de no aparece

    for (var i = 0; i <= 9; i++) {

      if(!ArrayPadre.includes(i.toString())){
        ban = false;
        if(digito != null){
          digito = digito +i+","

        }
        else{
          digito = i+","
        }

      aux.push(this.menosAparece(ArrayPadre,1));   //imprime del 0 al 9 el que no esta

      }

    }
    if(ban){
    aux.push (this.menosAparece(ArrayPadre,0));
    var a = this.menosAparece(ArrayPadre,0);
      digitos.push(a.resultado) ;    //busca que numero del 0 al 9 no esta en el array
    }
    else{

      digitos.push(digito+"| 0 ");
    }
  }
    itemTabla=itemTabla.concat([{concentrado:aux,universo:ArrayPadre.length,d1:digitos[0].toString()}]);
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
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Cantidad sorteos</Table.HeaderCell>
              <Table.HeaderCell>numero - (Frecuencia)</Table.HeaderCell>


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
          <Table.Cell>{this.props.fila.universo/5} </Table.Cell>
          <Table.Cell onClick={this.handleClick1}>{this.props.fila.d1} </Table.Cell>



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


export default DesEmpate;
