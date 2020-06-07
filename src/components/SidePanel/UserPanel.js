import React, { Component } from 'react'
import firebase from '../../firebase'
import { Grid, Header, Icon, Dropdown ,Image} from 'semantic-ui-react'
// import  {connect} from 'react-redux'

class UserPanel extends Component{
  state = {
    user:this.props.currentUser
  }
  

  dropDownOptions= () => [
    {
    text:<span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
    disabled:true,
    key:'name'
    },
    {
      key:"Avatar",
      text:<span>Change Avatar</span>
    },
    {
      key:"SignOut",
      text:<span onClick={this.handleSignOut} >SignOut</span>
    }

  ]

  handleSignOut = ()=>{
    firebase
    .auth()
    .signOut()
    .then(()=> console.log('signed out!'))
  }

  render(){
    const {user}= this.state
      return(
      <Grid style ={{ background : '#4c3c4c' }}>
        <Grid.Column>
          <Grid.Row style = {{padding : '1.2em' , margin : 0}}>
            <Header inverted floated='left' as= 'h2' >
              <Icon name = 'code' />
              <Header.Content>
                DevChat
              </Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding:'0.25em' }}  as='h4' inverted >
                <Dropdown trigger = {
                  <span>

                    <Image src = {user.photoURL} spaced = 'right' avatar />
                    {user.displayName}
                  </span>
                } options = {this.dropDownOptions()}/>
          </Header>
        </Grid.Column>
        
      </Grid>
    )
  }
}




export default UserPanel