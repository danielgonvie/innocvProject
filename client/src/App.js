import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AuthService from "./services/AuthService";

import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Sidebar from "./components/Sidebar/Sidebar";
import UserList from "./components/UserList/UserList";
import UserDetail from "./components/UserDetail/UserDetail";
import NewUser from "./components/NewUser/NewUser";
import NotAllowed from "./components/NotAllowed/NotAllowed";
import Secret from "./components/Secret/Secret";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
    lang: true
  };

  setUser = user => {
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleLogout = e => {
    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState({ user: null });
      },
      error => {
        console.error(error);
      }
    );
  };

  switchLang = e => {
    e.preventDefault();
    let lang = !this.state.lang;
    this.setState({ ...this.state, lang: lang });
  };

  render() {
    const { user } = this.state;
    const { lang } = this.state;

    //First time triying multi-language, probably will be like over 9000 better ways to do it.
    let text1;
    let text2;
    let text3;
    //Eng
    if (this.state.lang === true) {
      text1 = "No match for";
      text2 = "Are you lost? It seems like you do.";
      text3 = "Get me out of here!";
    } else {
      text1 = "No se encontró";
      text2 = "¿Estás perdido? Parece que sí";
      text3 = "Sácame de aquí!";
    }

    //Esp

    const NoMatch = ({ location }) => (
      <div className="nomatch-component">
        <img
          className="no-gif"
          src="https://media2.giphy.com/media/ly8G39g1ujpNm/giphy.gif?cid=790b761142e4c6ee9a3e38ce715d90695af72b14bdcd671f&rid=giphy.gif"
          alt="404"
        ></img>
        <h3 className="nomatch-info">
          {text1} <code>{location.pathname}</code>
        </h3>
        <h3 className="nomatch-info">{text2}</h3>
        <Link className="safe-link" to="/">
          <h3 className="nomatch-button">{text3}</h3>
        </Link>
      </div>
    );

    return (
      <div>
        {user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    logout={this.handleLogout}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <UserList {...match} user={user} lang={lang}></UserList>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    logout={this.handleLogout}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <UserDetail {...match} user={user} lang={lang}></UserDetail>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/new"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    logout={this.handleLogout}
                    switch={this.switchLang}
                  ></Sidebar>
                  <NewUser {...match} user={user} lang={lang}></NewUser>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/secret"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    logout={this.handleLogout}
                    switch={this.switchLang}
                  ></Sidebar>
                  <Secret {...match} user={user} lang={lang}></Secret>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}

        {!user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <UserList {...match} user={user} lang={lang}></UserList>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <UserDetail {...match} user={user} lang={lang}></UserDetail>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/new"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <NewUser {...match} user={user} lang={lang}></NewUser>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/login"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <Login {...match} setUser={this.setUser} lang={lang} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/signup"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <SignUp {...match} setUser={this.setUser} lang={lang} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/secret"
              render={match => (
                <React.Fragment>
                  <Sidebar
                    {...match}
                    user={user}
                    lang={lang}
                    switch={this.switchLang}
                  ></Sidebar>
                  <NotAllowed
                    {...match}
                    setUser={this.setUser}
                    lang={lang}
                  ></NotAllowed>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}
      </div>
    );
  }
}
