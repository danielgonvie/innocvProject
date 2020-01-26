import React, { Component } from "react";
import UserService from "../../services/UserService";
import Button from "react-bootstrap/Button";
import "./NewUser.scss";

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      users: [],
      user: {
        name: "",
        birthdate: ""
      }
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value },
      confirm: false
    });
  };

  pushUser = (e, name, birthdate) => {
    e.preventDefault();
    this.userService.newUser(name, birthdate);
    let usersArr = this.state.users;
    usersArr.push(this.state.user);
    this.setState({
      ...this.state,
      users: usersArr,
      user: { name: "", birthdate: "" }
    });
  };

  render() {

     //Multi-language
     let text1;
     let text2;
     let text3;
     let text4;
     
     if (this.props.lang === true){
       text1 = "Add user"
       text2 = "Name up to 10 characters"
       text3 = "Add user!"
       text4 = "New users"
     } else{
       text1 = "Añadir usuario"
       text2 = "Nombre de hasta 10 letras"
       text3 = "Añadir!"
       text4 = "Nuevos usuarios"
     }

     
    let newUsers = <React.Fragment></React.Fragment>;
    if (this.state.users !== []) {
      newUsers = (
        <div className="new-users-container">
          <h1 className="new-users-title">{text4}</h1>
          {this.state.users.map((user, i) => (
            <div className="new-user-added">
              <h4 className="new-user-name">{user.name}</h4>
              <h4 className="new-user-date">{user.birthdate}</h4>
            </div>
          ))}
        </div>
      );
    }
   
    return (
      <div className="add-new-user-panel">
        <div className="add-new-user">
          <h1 className="add-user-title">{text1}</h1>
          <form
            className="add-user-form"
            onSubmit={e =>
              this.pushUser(e, this.state.user.name, this.state.user.birthdate)
            }
          >
            <input
              type="text"
              name="name"
              pattern="[A-Za-z_ áéíóú]{1,10}"
              value={this.state.user.name}
              onChange={e => this.handleChange(e)}
              className="add-user-name"
              required
              placeholder={text2}
            ></input>
            <input
              type="date"
              name="birthdate"
              pattern="20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])"
              value={this.state.user.birthdate}
              onChange={e => this.handleChange(e)}
              className="add-user-date"
              required
            ></input>
            <Button variant="primary" className="add-user-button">
              <input className="input-button" type="submit" value={text3} />
            </Button>
          </form>
        </div>

        {newUsers}
      </div>
    );
  }
}
