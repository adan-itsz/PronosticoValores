import React,{Component} from 'react'
import * as firebase from 'firebase'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import LoginForm from './login.js'
import SidebarIzquierda from './sideBar.js'



function PrivateRoute({component: Component, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/' , state: {from: props.location}}} />}
    />
  )
}


function PublicRouteLogin ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/tris' />}
    />
  )
}

class Routes extends Component {

  state = {
    authed: false,
    loading: true,
    user:''
  }
  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user:user.email
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {

      return this.state.loading === true ? <h1>Loading</h1> : (
        <div>
        <BrowserRouter>
          <Switch>

            <PublicRouteLogin exact authed={this.state.authed} path="/" component={LoginForm}/>
            <PrivateRoute user ={this.state.user} authed={this.state.authed} path='/tris' component={SidebarIzquierda} />
            <Route render={() => <h3>Uups! ocurrio un error :D</h3>} />
          </Switch>
        </ BrowserRouter>
        </div>
    );
  }
}
export default Routes;
