import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Icon, Header } from 'semantic-ui-react'
import './index.css';
import Pronostico from './pantallaPronostico.js';
class SidebarIzquierda extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>
        <div className="topBar">
          <button className="btn-sidebar" onClick={this.toggleVisibility}><Icon name='content' size='big'/></button>
        </div>
        <div className='sideBar-contenedor'>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide out' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='line chart' />
              Seccion 2
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='credit card alternative' />
              Seccion 3
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div className="contenidoBarra">
                  <Pronostico/>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>
      </div>
    )
  }
}

export default SidebarIzquierda;
