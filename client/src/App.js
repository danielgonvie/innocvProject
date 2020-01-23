import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import AuthService from './services/AuthService';

import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';

import './App.scss';

import Navbar from './components/Navbar/Navbar';





export default class App extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();

  }

  state = {
    user: null,

  };

  setUser = (user) => {
    this.setState({ ...this.state, user })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }

  componentDidMount() {
    this.fetchUser()
  }

  deleteUser(){
    this.setState({user:null})
  }


  render() {
    const { user } = this.state;
    return (
      <div>
        
          {user && <Switch>
            <Route exact path="/users"  render={(match) => <React.Fragment> <Navbar {...match} user={user} logout={this.deleteUser}></Navbar></React.Fragment>}/> 
            <Route exact path="/users/:id"  render={(match) => <React.Fragment> <Navbar {...match} user={user} logout={this.deleteUser}></Navbar></React.Fragment>}/> 
            
          </Switch> }
          
          {!user && <Switch>
            <Route exact path="/users"  render={(match) => <React.Fragment> <Navbar {...match} user={user} logout={this.deleteUser}></Navbar></React.Fragment>}/> 
            <Route exact path="/login"  render={(match) => <React.Fragment> <Navbar {...match} user={user} ></Navbar><Login {...match} setUser={this.setUser}/></React.Fragment>}/> 
            <Route exact path="/signup"  render={(match) => <React.Fragment> <Navbar {...match} user={user} ></Navbar> <SignUp {...match} setUser={this.setUser}/></React.Fragment>}/> 
          </Switch> }
          
        
      </div>
    )
  }
}
