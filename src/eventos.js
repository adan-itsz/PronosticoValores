import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Header, Icon,Image, Statistic ,Table,Dropdown,Divider} from 'semantic-ui-react';
import {Button as Btn} from 'semantic-ui-react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DatePicker from 'material-ui-pickers/DatePicker';

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
    var date = new Date();
    var date2=new Date(date.getFullYear(), date.getMonth(), 1)
    this.state={
      datosItem:[],
      open:false,
      sorteo:'',
      combinacion:'',
      cantidad:'',
      cantidadGanada:'0',
      ganado:false,
      datosListos:false,
      value2:0,
      selectedDate: date2,
      fecha1:date2.getMonth()+'/'+date2.getDate()+'/'+date2.getFullYear(),
      selectedDate2: date,
      fecha2:date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear(),
      terminado:false,
      openResumen:false,
      estadisticaDirecta5:[],
      estadisticaDirecta4:[],
      estadisticaDirecta3:[],
      estadisticaParInicial:[],
      estadisticaParFinal:[],
      estadisticaInical:[],
      estadisticaFinal:[],
      datosEstadistica:[]

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
        var datosFiltrados=this.filtrarDatosFecha(res.data);
        this.separarDatosTipo(datosFiltrados);
        this.separarDatosEstadisticas(datosFiltrados);

      })
  }
  actualizarDatos=()=>{
    var datosFiltrados=this.filtrarDatosFecha(this.state.datosItem);
    this.separarDatosTipo(datosFiltrados);
    this.separarDatosEstadisticas(datosFiltrados);
  }

   intlRound=(numero, decimales , usarComa )=>{
    var opciones = {
        maximumFractionDigits: decimales,
        useGrouping: false
    };
    usarComa = usarComa ? "es" : "en";
    return new Intl.NumberFormat(usarComa, opciones).format(numero);
}

  filtrarDatosFecha=(data)=>{
    var datos=[];
    for(var i=0;i<data.length;i++){
      if(Date.parse(this.formatoFechas(data[i].fecha)) >= Date.parse(this.state.fecha1) && Date.parse(this.formatoFechas(data[i].fecha))<=Date.parse(this.state.fecha2)){
        datos=datos.concat(data[i]);
      }
    }
    return datos;
  }

  formatoFechas=(date)=>{
    var dia;
    var mes;
    var anio;
    var cont=0;
    var aux=0;

    for(var i=0;i<date.length;i++){
        if(date[i]=='/'){
          if(cont==0){
            dia=date.substring(aux,i);
            aux=i+1;
            cont++;
          }
          else if(cont==1){
            mes=date.substring(aux,i);
            aux=i+1;
            cont++;
          }
        }
       else if(i==date.length-1){
          anio=date.substring(aux,date.length);
        }
    }
    return mes+'/'+dia+'/'+anio;
  }

  separarDatosTipo=(datos)=>{
    var datos=datos;
    var directa5=[];
    var directa4=[];
    var directa3=[];
    var parFinal=[];
    var parInicial=[];
    var final=[];
    var inicial=[];

    for(var i=0;i<datos.length;i++){
      switch (datos[i].modalidad) {
        case 1:
            directa5=directa5.concat(datos[i]);
          break;
        case 2:
          directa4=directa4.concat(datos[i]);
          break;
        case 3:
          directa3=directa3.concat(datos[i]);
          break;
        case 4:
          parInicial=parInicial.concat(datos[i]);
          break;
        case 5:
          parFinal=parFinal.concat(datos[i]);
          break;
        case 6:
          inicial=inicial.concat(datos[i]);
          break;
        case 7:
            final=final.concat(datos[i]);
          break;

      }
    }
    var estadisticaDirecta5= this.separarDatosEstadisticas(directa5);
    var estadisticaDirecta4=this.separarDatosEstadisticas(directa4);
    var estadisticaDirecta3= this.separarDatosEstadisticas(directa3);
    var estadisticaParInicial=this.separarDatosEstadisticas(parInicial);
    var estadisticaParFinal=this.separarDatosEstadisticas(parFinal);
    var estadisticaInical=this.separarDatosEstadisticas(inicial);
    var estadisticaFinal=this.separarDatosEstadisticas(final);
    this.setState({
      directa5:directa5,
      directa4:directa4,
      directa3:directa3,
      parInicial:parInicial,
      parFinal:parFinal,
      inicial:inicial,
      final:final,
      estadisticaDirecta5:estadisticaDirecta5,
      estadisticaDirecta4:estadisticaDirecta4,
      estadisticaDirecta3:estadisticaDirecta3,
      estadisticaParInicial:estadisticaParInicial,
      estadisticaParFinal:estadisticaParFinal,
      estadisticaInical:estadisticaInical,
      estadisticaFinal:estadisticaFinal,
      terminado:true
    })
  }
  separarDatosEstadisticas=(datos)=>{
    var datos=datos;
    var sorteos=0;
    var inversion=0;
    var ganados=0;
    var cantidadGanada=0;
    var ganado=0;
    var margen=0;
    var Rentabilidad=0;
    var datosEstadistica=[];
    var Acertividad=0.0;
    for(var i=0;i<datos.length;i++){
        sorteos++;
        inversion+=parseInt(datos[i].cantidadApostada);
        cantidadGanada+=parseInt(datos[i].cantidadGanada);
        if(datos[i].ganado){
          ganados++;
        }
    }
    Acertividad=this.intlRound((ganados/sorteos)*100,3,false);
    margen=cantidadGanada-inversion;
    Rentabilidad=margen <0 && cantidadGanada==0?this.intlRound((cantidadGanada*100)/inversion,3,false):
    margen<0?'-'+this.intlRound((cantidadGanada*100)/inversion,3,false):this.intlRound((cantidadGanada*100)/inversion,3,false)
    datosEstadistica={
      sorteos:sorteos,
      inversion:inversion,
      ganados:ganados,
      cantidadGanada:cantidadGanada,
      rentabilidad:Rentabilidad,
      margen:margen,
      acertividad:Acertividad,
    };
    this.setState({
      datosEstadistica:datosEstadistica,
      datosListos:true
    })
    return datosEstadistica;
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
        cantidadGanada:0,tipo:this.state.tipo,modalidad:this.state.value,ganado:this.state.ganado })
      .then(res => {
    //    alert(res.data);
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
    handleChangeTab = (event, value2) => {
      this.setState({ value2 });
    };

    handleDateChange=(date)=>{
      this.setState({
        fecha1:date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear(),
        selectedDate:date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear(),
      })
    }
    handleDateChange2=(date)=>{
      this.setState({
        fecha2:date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear(),
        selectedDate2:date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear(),
      })
    }
    filtrar=()=>{

      this.actualizarDatos();
      this.setState({
        openResumen:true
      })
    }
    handleCloseResumen=()=>{
      this.setState({
        openResumen:false
      })
    }

  render(){
    const { selectedDate } = this.state;
    const { selectedDate2 } = this.state;
    const {value}=this.state
    const {value2}=this.state
    const{tipo}= this.state
    const {terminado}=this.state
    const estadisticaLista=this.state.datosListos;
    return(
      <div className="contenedorEventos">
      <Header as='h2' className="encabezado">
        <Icon name='calendar alternate outline' />
        <Header.Content >Registro de eventos</Header.Content>
      </Header>
      <div className="picker">
        <div className="picker-individual">
          <DatePicker
              value={selectedDate}
              onChange={this.handleDateChange}
            />
          </div>
          <div className="picker-individual">
            <DatePicker
                value={selectedDate2}
                onChange={this.handleDateChange2}
              />
            </div>
            <div className="picker-individual">
              <Btn content='filtrar' onClick={this.filtrar} />
            </div>
          </div>

      <Tabs value={this.state.value} onChange={this.handleChangeTab}
            fullWidth  indicatorColor="primary" textColor="secondary">

            <Tab icon={<i class="material-icons">filter_5</i>} label="Directa5" ></Tab>
            <Tab icon ={<i class="material-icons">filter_4</i>} label="Directa4"></Tab>
            <Tab icon={<i class="material-icons">filter_3</i>} label="Directa3"></Tab>chess knight
            <Tab icon={<i class="material-icons">filter_2</i>} label="Par inicial"></Tab>
            <Tab icon={<i class="material-icons">looks_two</i>} label="Par final"></Tab>
            <Tab icon={<i class="material-icons">filter_1</i>} label="Inicial"></Tab>
            <Tab icon={<i class="material-icons">looks_one</i>} label="Final"></Tab>

      </Tabs>

      <Dialog
          open={this.state.openResumen}
          onClose={this.handleCloseResumen}
          maxWidth={'md'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Resumen eventos"}</DialogTitle>
            <DialogContent>
            <Table celled>
             <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell>Modalidad</Table.HeaderCell>
                   <Table.HeaderCell>Cantidad Sorteos</Table.HeaderCell>
                   <Table.HeaderCell>Inversión</Table.HeaderCell>
                   <Table.HeaderCell>Sorteos ganados</Table.HeaderCell>
                   <Table.HeaderCell>Cantidad ganada</Table.HeaderCell>
                   <Table.HeaderCell>Margen</Table.HeaderCell>
                   <Table.HeaderCell>Rentabilidad</Table.HeaderCell>
                   <Table.HeaderCell>% Acertividad</Table.HeaderCell>
                 </Table.Row>
               </Table.Header>

               <Table.Body>
                 <Table.Row>
                   <Table.Cell>Directa 5</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta5.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaDirecta5.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Directa 4</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta4.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaDirecta4.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Directa 3</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaDirecta3.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaDirecta3.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Par inicial</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParInicial.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaParInicial.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Par final</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaParFinal.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaParFinal.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Número inicial</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaInical.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaInical.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Número final</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.inversion}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.ganados}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.margen}</Table.Cell>
                   <Table.Cell>{this.state.estadisticaFinal.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.estadisticaFinal.acertividad}%</div></Table.Cell>
                 </Table.Row>
                 <Table.Row warning>
                   <Table.Cell>Total</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.sorteos}</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.inversion}</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.ganados}</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.cantidadGanada}</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.margen}</Table.Cell>
                   <Table.Cell>{this.state.datosEstadistica.rentabilidad}%</Table.Cell>
                   <Table.Cell><div className='acertividad'>{this.state.datosEstadistica.acertividad}%</div></Table.Cell>
                 </Table.Row>

               </Table.Body>
             </Table>


            </DialogContent>
        </Dialog>

    {value2==0 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.directa5.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaDirecta5}/>
      </div>
      </div>
      :<div></div>
    }
    {value2==1 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.directa4.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaDirecta4}/>
      </div>
      </div>
      :<div></div>
    }
    {value2==2 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.directa3.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaDirecta3}/>
      </div>
      </div>
      :<div></div>
    }
    {value2==3 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.parInicial.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaParInicial}/>
      </div>
      </div>
      :<div></div>
    }
    {value2==4 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.parFinal.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaParFinal}/>
      </div>
      </div>
      :<div></div>
    }

    {value2==5 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.inicial.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaInical}/>
      </div>
      </div>
      :<div></div>
    }
    {value2==6 &&terminado
    ?<div><Table celled>
        <Table.Header>
          <Encabezado/>
        </Table.Header>

        <Table.Body>
          {this.state.final.map((it,key)=>{
            return(<Item fila={it} i={key} actualizarLista={this.tomarDatosTabla}/>)
          })}
        </Table.Body>
      </Table>
      <div className='estadisticas'>
       <StatisticExampleValue datos={this.state.estadisticaFinal}/>
      </div>
      </div>:<div></div>
    }
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
        <Divider />
        {estadisticaLista?
         <div className='estadisticas'>
          <StatisticExampleValue datos={this.state.datosEstadistica}/>
         </div>:
         <div></div>
       }
       <div className='tituloEstadistica'>
       <h2>Estadística Total</h2>
        </div>
        </div>
    )
  }
}
const Encabezado = () => (
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
)




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
    <Statistic>
      <Statistic.Value>

        {this.props.datos.margen}

      </Statistic.Value>
      <Statistic.Label>Margen</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>

        {this.props.datos.acertividad}%

      </Statistic.Value>
      <Statistic.Label>Acertabilidad</Statistic.Label>
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
          <Table.Cell>${this.props.fila.cantidadApostada}</Table.Cell>
          <Table.Cell>
              <Switch
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"/>
        </Table.Cell>
        <Table.Cell>${this.props.fila.cantidadGanada}</Table.Cell>
          <Table.Cell>${this.props.fila.total}</Table.Cell>
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
