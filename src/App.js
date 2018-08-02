import React, { Component } from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

import Pronostico from'./pantallaPronostico.js'
import SidebarIzquierda from './sideBar.js'
class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <SidebarIzquierda/>
        </div>
      </MuiPickersUtilsProvider>

    );
  }
}

export default App;
