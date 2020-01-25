import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import AuthService from './services/AuthService';

import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import NewUser from './components/NewUser/NewUser';




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


  handleLogout = e => {
    const { history } = this.props;

    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState({ user: null });
       /*  history.push("/"); */
      },
      error => {
        console.error(error);
      }
    );
  };


  render() {
    const { user } = this.state;
    return (
      <div>
        
          {user && <Switch>
            <Route exact path="/"  render={(match) => <React.Fragment> <Sidebar {...match} user={user} logout={this.handleLogout}></Sidebar> <UserList {...match} user={user}></UserList> </React.Fragment>}/> 
            <Route exact path="/users/:id"  render={(match) => <React.Fragment> <Sidebar {...match} user={user} logout={this.handleLogout}></Sidebar> <UserDetail {...match} user={user}></UserDetail> </React.Fragment>}/> 
            
          </Switch> }
          
          {!user && <Switch>
            <Route exact path="/"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <UserList {...match} user={user}></UserList> </React.Fragment>}/> 
            <Route exact path="/users/:id"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <UserDetail {...match} user={user}></UserDetail> </React.Fragment>}/> 
            <Route exact path="/new"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <NewUser {...match} user={user}></NewUser></React.Fragment>}/> 
            <Route exact path="/login"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <Login {...match} setUser={this.setUser}/></React.Fragment>}/> 
            <Route exact path="/signup"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <SignUp {...match} setUser={this.setUser}/></React.Fragment>}/> 
          </Switch> }
          
        
      </div>
    )
  }
}
