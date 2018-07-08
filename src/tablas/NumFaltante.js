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

    universo30=this.reducirUniverso(100);
    var resultado30=this.NoAparece(universo30);


    this.setState({
      itemsTabla:resultado30
    })
  }



  NoAparece(Array){
  var ArrayAux = ["0","1","2","3","4","5","6","7","8","9"];
    var ArrayPadre = [];
    var j=4;

      for (var i = 0; i < Array[j].length; i++) {
        console.log(Array[j][i].length);
        for (var j = 4; j > 0; j--) {
          if (ArrayAux.length != 1) {
            if (ArrayAux.includes(Array[j][i])) {
              var index = ArrayAux.indexOf(Array[j][i])
              if (index > -1) {
                  ArrayAux.splice(index, 1);
                  var Digito = j+1;
                  var Sorteo = i+1;
                }
            }
          }
          else {
            ArrayPadre = ArrayPadre.concat([{Numero:ArrayAux.pop(),Digito:Digito,Sorteo:Sorteo}]);
            return ArrayPadre;
          }

      }
    }

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
              <Table.HeaderCell>Sorteos</Table.HeaderCell>



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
          <Table.Cell>{this.props.fila.Numero} </Table.Cell>
          <Table.Cell>{this.props.fila.Digito} </Table.Cell>
            <Table.Cell>{this.props.fila.Sorteo} </Table.Cell>
        </Table.Row>
      )
    }
  }


export default DesEmpate;
