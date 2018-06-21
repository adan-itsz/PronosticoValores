import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Header, Icon,Image, Statistic ,Table} from 'semantic-ui-react';
import './index.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Save from '@material-ui/icons/Save';

class Eventos extends Component{
  constructor(props){
    super(props)
    this.state={
      datos:[],
      open:false,
      sorteo:'',
      combinacion:'',
      cantidad:'',
      cantidadGanada:''
    };
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
    if(!isNaN(valor)){
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
  handleRef4=(e)=>{
    var valor=e.target.value;
    this.setState({
      cantidadGanada:valor
    })
  }

  render(){
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
            <Table.HeaderCell>Combinacion</Table.HeaderCell>
            <Table.HeaderCell>$ Cantidad apostada</Table.HeaderCell>
            <Table.HeaderCell>$ Cantidad ganada</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
        <Table.Row>
            <Table.Cell>20-06-2018</Table.Cell>
            <Table.Cell>22158</Table.Cell>
            <Table.Cell>87981</Table.Cell>
            <Table.Cell>20.00</Table.Cell>
            <Table.Cell>0.00</Table.Cell>
            <Table.Cell>-20.00</Table.Cell>


        </Table.Row>

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
                       <label >Sorteo</label>
                       <Input fluid placeholder='Sorteo' onChange={this.handleRef1} value={this.state.sorteo}/>
                  </div>

                  <div className='elemento-form'>
                       <label>Combinacion</label>
                       <Input fluid placeholder='Combinacion'onChange={this.handleRef2} value={this.state.combinacion} />
                  </div>
                  <div className='elemento-form'>
                       <label>Cantidad apostada</label>
                       <Input fluid placeholder='$ 0.00' onChange={this.handleRef3} value={this.state.cantidad} />
                  </div>

                   <div className='elemento-form'>
                       <label>Cantidad ganada</label>
                       <Input fluid placeholder='$ 0.00' onChange={this.handleRef4} value={this.state.cantidadGanada}/>
                    </div>
                       <div className='btn-guardar'>
                         <Button variant="contained" color="secondary" >
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
         <div className='estadisticas'>
          <StatisticExampleValue />
         </div>
        </div>
    )
  }
}


const StatisticExampleValue = () => (
  <Statistic.Group>
    <Statistic>
      <Statistic.Value>22</Statistic.Value>
      <Statistic.Label>Saves</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value text>
        Three<br />
        Thousand
      </Statistic.Value>
      <Statistic.Label>Signups</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Icon name='plane' />
        5
      </Statistic.Value>
      <Statistic.Label>Flights</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
        <Image src='https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg' inline circular />
        42
      </Statistic.Value>
      <Statistic.Label>Team Members</Statistic.Label>
    </Statistic>
  </Statistic.Group>
)
export default Eventos;
