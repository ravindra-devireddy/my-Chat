import React, { Component } from 'react'

import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css'
import login from './components/Auth/Login'
import register from './components/Auth/Register'
import firebase from './firebase'

import { BrowserRouter , Switch ,Route , withRouter} from 'react-router-dom'

import {createStore}  from 'redux'
import {Provider , connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/reducers';
import {setUser , clearUser} from './actions/actions';
import Spinner from './Spinner'

const store = createStore(rootReducer,composeWithDevTools())

class Root extends Component{
  componentDidMount(){
      firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login')
        this.props.clearUser();
      }
    })
  }
render(){
  return this.props.isLoading ? <Spinner/> : ( 
  <Switch>
    <Route exact path='/' component={App}  />
    <Route path='/Login' component={login}  />
    <Route path='/Register' component={register}  />
  </Switch>
  )
}
}
const mapStateFromProps = state =>({
  isLoading:state.user.isLoading
})
const RootWithAuth = withRouter(connect(mapStateFromProps,{ setUser , clearUser })(Root));

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter> 
      <RootWithAuth /> 
    </BrowserRouter>
  </Provider> ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
