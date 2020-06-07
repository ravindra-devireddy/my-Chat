import React, { Component } from 'react'

import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import firebase from '../../firebase'

import md5 from 'md5'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    errors: [],
    loading: false,
    usersRef:firebase.database().ref('users')

  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' }
      this.setState({ errors: errors.concat(error) })
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" }
      this.setState({ errors: errors.concat(error) })
      return false
    } else {
      return true
    }
  }
  isFormEmpty = ({ username, email, password, confirmpassword }) => {
    return !username || !email || !password || !confirmpassword
  }
  isPasswordValid = ({ password, confirmpassword }) => {
    if (password.length < 6 || confirmpassword.length < 6) {
      return false;
    } else if (password !== confirmpassword) {
      return false
    } else {
      return true
    }
  }
  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createduser => {
          console.log(createduser);
          createduser.user.updateProfile({
            displayName:this.state.username,
            photoURL:`http://gravator.com/avatar/${md5(createduser.user.email)}
            ?d=identicon`
          })
          .then(()=>{
            this.saveUser(createduser).then(()=>{
              console.log('user saved');
            })
            // this.setState({ loading: false })
          })
          .catch(err => {
            console.error(err);
            this.setState({errors:this.state.errors.concat(err),loading:false})
          }) 
        })
        .catch(err => {
          console.log(err)
          this.setState({ errors: this.state.errors.concat(err), loading: false })

        })
    }
  }
  saveUser =createduser =>{
    return this.state.usersRef.child(createduser.user.uid).set({
      name: createduser.user.displayName,
      avatar:createduser.user.photoURL
    });
  }
  handleInputError = (errors, inputName) => {
    return errors.some(Error => Error.message.toLowerCase().includes(inputName))
      ?
      "error" : ''
  }
  render() {
    const { username, email, password, confirmpassword, loading, errors } = this.state
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='orange'>
            <Icon name='puzzle piece' color='orange' />
              Register
          </Header>

          <Form size="large" onSubmit={this.handleSubmit} >
            <Segment stacked>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
                type='text' />

              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type='email' />

              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type='password' />

              <Form.Input
                fluid
                name='confirmpassword'
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm Password'
                onChange={this.handleChange}
                value={confirmpassword}
                className={this.handleInputError(errors, "password")}
                type='password' />

              <Button disabled={loading} className={loading ? "loading" : ''}
                color='orange' fluid size='large'> Submit </Button>

            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )

          }
          <Message>Already a user ?<Link to='/Login'>Login</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Register