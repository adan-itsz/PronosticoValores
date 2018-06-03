import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react'
import '../index.css';

class TablaRepeticion extends Component{

  handleRef = (c) => {
  //toma el universo
}

focus = () => {
  //hace busqueda y agrega a la tabla
}
    render(){
      return (
        <div className="form-boton">
        <div className="N-universo">
          <Input ref={this.handleRef} placeholder='N universo' />
          <Button content='filtrar' onClick={this.focus} />
        </div>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Universo</Table.HeaderCell>
              <Table.HeaderCell>D1</Table.HeaderCell>
              <Table.HeaderCell>D2</Table.HeaderCell>
              <Table.HeaderCell>D3</Table.HeaderCell>
              <Table.HeaderCell>D4</Table.HeaderCell>
              <Table.HeaderCell>D5</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>8</Table.Cell>
              <Table.Cell>7</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>7</Table.Cell>
              <Table.Cell>0</Table.Cell>

            </Table.Row>

            <Table.Row>
              <Table.Cell>n° sin repetir</Table.Cell>
              <Table.Cell>13</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>7</Table.Cell>
              <Table.Cell>12</Table.Cell>

            </Table.Row>


            <Table.Row>
              <Table.Cell>70</Table.Cell>
              <Table.Cell>2</Table.Cell>
              <Table.Cell>5</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>4</Table.Cell>

            </Table.Row>
            <Table.Row>
              <Table.Cell>n° sin repetir</Table.Cell>
              <Table.Cell>11</Table.Cell>
              <Table.Cell>19</Table.Cell>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>31</Table.Cell>
              <Table.Cell>12</Table.Cell>

            </Table.Row>
            <Table.Row>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>7</Table.Cell>
              <Table.Cell>3</Table.Cell>

            </Table.Row>

          </Table.Body>
        </Table>

        </div>
      )
    };
}

export default TablaRepeticion;
