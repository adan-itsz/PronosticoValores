import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MenorFrecuenciaTabla from './tablas/tablaMenorFrecuencia.js';
import TablaRepeticion from './tablas/tablaRepeticion.js';
import TablaRepeticionCruzada from './tablas/tablaRepeticioncruzada.js'
import MenorFrecuenciaParesTabla from './tablas/tablaParesMenorFrecuencia.js'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonPrevent extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    value: 0,
    datos:this.props.datos
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="off">
        
          </Tabs>
        </AppBar>
        {value === 0 && <p>dsfdgfg</p>}
        {value === 1 && <TabContainer><p>hola</p></TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}


export default withStyles(styles)(ScrollableTabsButtonPrevent);