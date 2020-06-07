import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux'

import ColorPanel from './components/colourpanel/ColourPanel'
import SidePanel from './components/SidePanel/SidePanel'
import Messages from './components/MessagesPanel/MessagesPanel'
import MetaPanel from './components/MetaPanel/MetaPanel'

const App = ({currentUser}) =>(
  <Grid columns='equal' className='app' style= {{ background:'#eee' }} >
    <ColorPanel/>
    <SidePanel currentUser = {currentUser} />

    <Grid.Column style= {{ marginLeft : 320 }} >
       <Messages/>
    </Grid.Column>
    <Grid.Column width={4}>
    <MetaPanel/>
    </Grid.Column>
    
  </Grid> 
)
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps) (App);


