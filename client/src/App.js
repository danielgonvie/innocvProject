import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';

import AuthService from './services/AuthService';

import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


import Sidebar from './components/Sidebar/Sidebar';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import NewUser from './components/NewUser/NewUser';
import NotAllowed from './components/NotAllowed/NotAllowed';
import Secret from './components/Secret/Secret';




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

    const NoMatch = ({ location }) => (
      <div className="nomatch-component">
      <img
          className="no-gif"
          src="https://media2.giphy.com/media/ly8G39g1ujpNm/giphy.gif?cid=790b761142e4c6ee9a3e38ce715d90695af72b14bdcd671f&rid=giphy.gif"
          alt="404"
        ></img>
        <h3 className="nomatch-info">No match for <code>{location.pathname}</code></h3>
        <h3 className="nomatch-info">Are you lost? It seems like you do.</h3>
        <Link className="safe-link" to="/"> <h3 className="nomatch-button">Get me out of here!</h3> </Link> 
      </div>
    )

    return (
      <div>
        
          {user && <Switch>
            <Route exact path="/"  render={(match) => <React.Fragment> <Sidebar {...match} user={user} logout={this.handleLogout}></Sidebar> <UserList {...match} user={user}></UserList> </React.Fragment>}/> 
            <Route exact path="/users/:id"  render={(match) => <React.Fragment> <Sidebar {...match} user={user} logout={this.handleLogout}></Sidebar> <UserDetail {...match} user={user}></UserDetail> </React.Fragment>}/> 
            <Route exact path="/new"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <NewUser {...match} user={user}></NewUser></React.Fragment>}/> 
            <Route exact path="/secret"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <Secret {...match} user={user}></Secret> </React.Fragment>}/>
            <Route component={NoMatch} />
          </Switch> }
          
          {!user && <Switch>
            <Route exact path="/"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <UserList {...match} user={user}></UserList> </React.Fragment>}/> 
            <Route exact path="/users/:id"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <UserDetail {...match} user={user}></UserDetail> </React.Fragment>}/> 
            <Route exact path="/new"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <NewUser {...match} user={user}></NewUser></React.Fragment>}/> 
            <Route exact path="/login"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <Login {...match} setUser={this.setUser}/></React.Fragment>}/> 
            <Route exact path="/signup"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <SignUp {...match} setUser={this.setUser}/></React.Fragment>}/> 
            <Route exact path="/secret"  render={(match) => <React.Fragment> <Sidebar {...match} user={user}></Sidebar> <NotAllowed {...match} setUser={this.setUser}></NotAllowed> </React.Fragment>}/>
            <Route component={NoMatch} />
          </Switch> }
          
        
      </div>
    )
  }
}
