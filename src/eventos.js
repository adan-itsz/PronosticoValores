import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Header, Icon,Image, Statistic ,Table,Dropdown} from 'semantic-ui-react';
import './index.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Save from '@material-ui/icons/Save';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';

const options = [
  { key: 1, text: 'Directa 5', value: 1 },
  { key: 2, text: 'Directa 4', value: 2 },
  { key: 3, text: 'Directa 3', value: 3 },
  { key: 4, text: 'Par inicial', value: 4},
  { key: 5, text: 'Par final', value: 5 },
  { key: 6, text: 'Inicial', value: 6},
  { key: 7, text: 'Final', value: 7 },

]
const tipoJuego=[
  { key: 1, text: 'Oficial', value: 1},
  { key: 2, text: 'Alternativo', value: 2 },
]

class Eventos extends Component{
  constructor(props){
    super(props)
    this.state={
      datosItem:[],
      open:false,
      sorteo:'',
      combinacion:'',
      cantidad:'',
      cantidadGanada:'0',
      ganado:false,
      datosListos:false

    };
  }
  componentDidMount(){
    this.tomarDatosTabla();
  }

  tomarDatosTabla=()=>{
    var d = new Date();
    var anio= d.getFullYear();
    var mes= d.getMonth();
    axios.post(`http://localhost:4000/eventos-descarga`,{anio:anio,mes:mes})
      .then(res => {
        console.log(res.data[0]);
        this.setState({
          datosItem:res.data
        });
        this.separarDatosEstadisticas(res.data);

      })
  }
   intlRound=(numero, decimales , usarComa )=>{
    var opciones = {
        maximumFractionDigits: decimales,
        useGrouping: false
    };
    usarComa = usarComa ? "es" : "en";
    return new Intl.NumberFormat(usarComa, opciones).format(numero);
}

  separarDatosEstadisticas=(datos)=>{
    var datos=datos;
    var sorteos=0;
    var inversion=0;
    var ganados=0;
    var cantidadGanada=0;
    var Rentabilidad=0;
    var datosEstadistica=[];
    for(var i=0;i<datos.length;i++){
        sorteos++;
        inversion+=parseInt(datos[i].cantidadApostada);
        cantidadGanada+=parseInt(datos[i].cantidadGanada);
        if(datos[i].ganado){
          ganados++;
        }
    }
    Rentabilidad=this.intlRound(((cantidadGanada-inversion)/cantidadGanada)*100,3,false);
    datosEstadistica={
      sorteos:sorteos,
      inversion:inversion,
      ganados:ganados,
      cantidadGanada:cantidadGanada,
      rentabilidad:Rentabilidad
    };
    this.setState({
      datosEstadistica:datosEstadistica,
      datosListos:true
    })
  }

  handleClose=()=>{
    this.setState({
      open:false
    })
  }
  abrir=()=>{
    this.setState({
      open:true
    })
  }
  handleRef1=(e)=>{
    var valor=e.target.value;
    if(!isNaN(valor)){
    this.setState({
      sorteo:valor
    })

    }
    else{
      alert("introduce valor valido");
      this.setState({
      sorteo:''
      })
    }
  }

  handleRef2=(e)=>{
    var valor=e.target.value;
    if(!isNaN(valor)|valor==='X'){
    this.setState({
      combinacion:valor
    })

    }
    else{
      alert("introduce valor valido");
      this.setState({
      combinacion:''
      })
    }
  }
  handleRef3=(e)=>{
    var valor=e.target.value;
    this.setState({
      cantidad:valor
    })
  }

  subirForm=()=>{
    var value=this.state.value;
    var comb=this.state.combinacion;
    var combinacion;
    switch (value) {
      case 2:

        combinacion='X'+comb;
        break;
      case 3:
        combinacion='XX'+comb;
        break;
      case 4:
          combinacion=comb+'XXX';
          break;
      case 5:
        combinacion='XXX'+comb;
          break;
      case 6:
          combinacion=comb+"XXXX";
          break;
      case 7:
          combinacion='XXXX'+comb;
          break;
      default:
        combinacion=comb;

    }

    axios.post(`http://localhost:4000/evento`,
      { sorteo:this.state.sorteo,combinacion:combinacion,cantidadApostada:this.state.cantidad,
        cantidadGanada:this.state.cantidadGanada,tipo:this.state.tipo,modalidad:this.state.value,ganado:this.state.ganado })
      .then(res => {
        alert(res.data);
        this.setState({
          cantidadGanada:'',
          cantidad:'',
          combinacion:'',
          sorteo:'',
          open:false,
          datosItem:[]
        })
        this.tomarDatosTabla();
      })

  }
  handleChange = (e, { value }) =>{
     this.setState({
       value:value,
       combinacion:''
      })
   }
   handleChange2 = (e, { value }) =>{
      this.setState({
        tipo:value
       })
    }

  render(){
    const {value}=this.state
    const{tipo}= this.state
    const estadisticaLista=this.state.datosListos;
    return(
      <div className="contenedorEventos">
      <Header as='h2' className="encabezado">
        <Icon name='calendar alternate outline' />
        <Header.Content >Registro de eventos</Header.Content>
      </Header>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> Fecha</Table.HeaderCell>
            <Table.HeaderCell>Sorteo</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Modalidad</Table.HeaderCell>
            <Table.HeaderCell>Combinacion</Table.HeaderCell>
            <Table.HeaderCell>$ Cantidad apostada</Table.HeaderCell>
            <Table.HeaderCell>Ganador</Table.HeaderCell>
            <Table.HeaderCell>$ Cantidad ganada</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.datosItem.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>

      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Completar información de nuevo evento"}</DialogTitle>
            <DialogContent>
              <div className='formulario-evento'>
                  <div className='elemento-form'>
                       <label >Tipo</label>
                       <div className='dropTipoSorteo'>
                          <Dropdown
                             onChange={this.handleChange2}
                             options={tipoJuego}
                             placeholder='elige una opcion'
                             selection
                             value={tipo}
                           />
                        </div>
                  </div>

                  <div className='elemento-form'>
                       <label >Sorteo</label>
                       <Input fluid placeholder='Sorteo' onChange={this.handleRef1} value={this.state.sorteo}/>
                  </div>

                  <div className='elemento-form'>
                       <label >Modalidad</label>
                       <div className='dropTipoSorteo'>
                          <Dropdown
                             onChange={this.handleChange}
                             options={options}
                             placeholder='elige una opcion'
                             selection
                             value={value}
                           />
                        </div>
                  </div>

                  <div className='elemento-form'>
                       <label>Combinacion</label>
                       <Input fluid placeholder='Combinacion'onChange={this.handleRef2} value={this.state.combinacion} />
                  </div>
                  <div className='elemento-form'>
                       <label>Cantidad apostada</label>
                       <Input fluid placeholder='$ 0.00' onChange={this.handleRef3} value={this.state.cantidad} />
                  </div>


                       <div className='btn-guardar'>
                         <Button variant="contained" color="secondary" onClick={this.subirForm}>
                          <Save />
                            Guardar registro
                          </Button>
                        </div>
              </div>
            </DialogContent>
        </Dialog>
         <Button variant="fab" color="secondary" aria-label="add" onClick={this.abrir}>
          <AddIcon />
        </Button>
        {estadisticaLista?
         <div className='estadisticas'>
          <StatisticExampleValue datos={this.state.datosEstadistica}/>
         </div>:
         <div></div>
       }
        </div>
    )
  }
}


class StatisticExampleValue extends Component{
  constructor(props){
    super(props)

  }


  render(){
    return(
  <Statistic.Group>
    <Statistic>
      <Statistic.Value>{this.props.datos.sorteos}</Statistic.Value>
      <Statistic.Label>Sorteos</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value text>
        ${this.props.datos.inversion}<br />
        Pesos
      </Statistic.Value>
      <Statistic.Label>Cantidad invertida</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='trophy' />
        {this.props.datos.ganados}
      </Statistic.Value>
      <Statistic.Label>Sorteos ganados</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        ${this.props.datos.cantidadGanada}
      </Statistic.Value>
      <Statistic.Label>Cantidad ganada</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value>

        {this.props.datos.rentabilidad}%

      </Statistic.Value>
      <Statistic.Label>Rentabilidad</Statistic.Label>
    </Statistic>
  </Statistic.Group>
  )
 }
}
class Item extends Component{
  constructor(props){
    super(props)
    this.state={
      checked: this.props.fila.ganado,
      open:false

    }

  }
  handleChange = name => event => {
    if(this.state.checked){
      this.setState({checked:false,open:true});
    }
    else{
    this.setState({checked:true,open:true});
  }
  };
  handleClose=()=>{
    this.setState({open:false});
  }
  cambiarBD=()=>{
    axios.post(`http://localhost:4000/evento-updateGan`,
      { key:this.props.fila.key,ganado:this.state.checked,modalidad:this.props.fila.modalidad,tipo:this.props.fila.tipo,
        fecha:this.props.fila.fecha,cantidadApostada:this.props.fila.cantidadApostada })
      .then(res => {
        alert(res.data);
        this.setState({
          open:false,
        })
        this.props.actualizarLista();
      })
  }

  render(){
    const tipo=this.props.fila.tipo;
    const tipoTabla=tipo==1?'Oficial':'Alternativo'
    const modalidad=this.props.fila.modalidad;
    const modalidadTabla=modalidad==1?'Directa 5':
                         modalidad==2?'Directa 4':
                         modalidad==3?'Directa 3':
                         modalidad==4?'Par inical':
                         modalidad==5?'Par final':
                         modalidad==6?'Inicial':
                         modalidad==7?'Final':0
    return(
      <Table.Row>
          <Table.Cell>{this.props.fila.fecha}</Table.Cell>
          <Table.Cell>{this.props.fila.sorteo}</Table.Cell>
          <Table.Cell>{tipoTabla}</Table.Cell>
          <Table.Cell>{modalidadTabla}</Table.Cell>
          <Table.Cell>{this.props.fila.combinacion}</Table.Cell>
          <Table.Cell>{this.props.fila.cantidadApostada}</Table.Cell>
          <Table.Cell>
              <Switch
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"/>
        </Table.Cell>
        <Table.Cell>{this.props.fila.cantidadGanada}</Table.Cell>
          <Table.Cell>{this.props.fila.total}</Table.Cell>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"¿Seguro quieres modificarlo?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  La base de datos marcará el evento como ganado
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={this.cambiarBD} color="primary" autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
        </Dialog>
      </Table.Row>


    )
  }

}
export default Eventos;
