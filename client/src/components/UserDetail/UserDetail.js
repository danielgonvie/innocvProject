import React, { Component } from "react";
import UserService from "../../services/UserService";
import Button from "react-bootstrap/Button";

import "./UserDetail.scss";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      user: null,
      name: null,
      birthdate: null,
      confirm: false
    };
  }

  displayUser = () => {
    let date = this.state.birthdate;
    date = date.split("");
    date.splice(10, 20);

    //Multi-language
    let text1;
    let text2;
    let text3;
    let text4;
    let text5;

    if (this.props.lang === true) {
      text1 = "Info";
      text2 = "Edit";
      text3 = "Name up to 10 characters";
      text4 = "Save changes!";
      text5 = "DELETE USER!";
    } else {
      text1 = "Datos";
      text2 = "Editar";
      text3 = "Nombre de hasta 10 caracteres";
      text4 = "¡Guardar cambios!";
      text5 = "¡ELIMINAR USUARIO!";
    }

    return (
      <div className="user-profile-options">
        <div className="user-info">
          <h1 className="user-title">{text1}</h1>
          <h1 className="user-name">{this.state.name}</h1>
          <h1 className="user-date">{date}</h1>
        </div>

        <div className="user-edit-info">
          <h1 className="user-edit-title">{text2}</h1>
          <form className="user-edit-form" onSubmit={this.saveUser}>
            <input
              type="text"
              name="name"
              pattern="[A-Za-z_ áéíóú]{1,10}"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
              className="user-edit-name"
              required
              placeholder={text3}
            ></input>
            <input
              type="date"
              name="birthdate"
              pattern="[20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])]"
              value={this.state.birthdate}
              onChange={e => this.handleChange(e)}
              className="user-edit-date"
            ></input>
            <Button variant="primary" className="edit-button">
              <input className="input-button" type="submit" value={text4} />
            </Button>
          </form>
        </div>

        <Button
          variant="danger"
          className="delete-button"
          onClick={e => this.deleteUser(e, this.state.user)}
        >
          {text5}
        </Button>
      </div>
    );
  };

  componentDidMount() {
    this.updateUser();
  }

  updateUser = () => {
    this.userService.fetchOneUser(this.props.match.params.id).then(
      user => {
        this.setState({
          ...this.state,
          user,
          name: user.name,
          birthdate: user.birthdate
        });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value, confirm: false });
  };

  saveUser = e => {
    e.preventDefault();
    this.userService.updateUser(
      this.state.user._id,
      this.state.name,
      this.state.birthdate
    );
    this.setState({
      ...this.state,
      confirm: true
    });
  };

  deleteUser = (e, user) => {
    const { history } = this.props;
    e.preventDefault();
    this.userService.deleteUser(user._id).then(user => {
      this.userService.fetchUsers().then(
        () => {
          this.setState({ user: null });
          history.push("/");
        },
        error => {
          console.error(error);
        }
      );
    });
  };

  render() {
    //Multi-language
    let text6;
    let text7;

    if (this.props.lang === true) {
      text6 = "All changes saved!";
      text7 = "Loading user info...";
    } else {
      text6 = "¡Todos los cambios guardados!";
      text7 = "Cargando usuario...";
    }

    let confirm = <React.Fragment></React.Fragment>;
    if (this.state.confirm === true) {
      confirm = <h1 className="confirm-message">{text6}</h1>;
    }

    return (
      <div className="user-profile">
        {confirm}
        {this.state.user && this.displayUser()}
        {!this.state.user && <p>{text7}</p>}
      </div>
    );
  }
}
