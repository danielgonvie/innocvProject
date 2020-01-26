import React from "react";
import UserService from "../../services/UserService";
import UserCard from "../UserCard/UserCard";
import SearchBar from "../SearchBar/SearchBar";
import "./UserList.scss";
import { Link } from "react-router-dom";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      users: [],
      searchUsers: "",
      initialUsers: []
    };
  }

  deleteUser = user => {
    this.userService.deleteUser(user._id).then(user => {
      this.userService.fetchUsers().then(
        users => {
          this.setState({ ...this.state, users: users, initialUsers: users });
        },
        error => {
          const { message } = error;
          console.error(message);
        }
      );
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  searchUsers(e) {
    let users = [...this.state.users];
    this.state.searchUsers = e.target.value;
    let usersFound = users.filter(
      user =>
        user.name
          .toLowerCase()
          .includes(this.state.searchUsers.toLowerCase()) ||
        user.birthdate
          .toLowerCase()
          .includes(this.state.searchUsers.toLowerCase())
    );

    this.setState({
      ...this.state,
      users: usersFound
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 8) {
      this.setState({ users: this.state.initialUsers });
    }
  }

  displayUsers = () => {
    const { users } = this.state;
    return users.map((user, i) => (
      <UserCard key={i} user={user} delete={this.deleteUser} />
    ));
  };

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers = () => {
    this.userService.fetchUsers().then(
      users => {
        this.setState({ ...this.state, users: users, initialUsers: users });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  render() {
    const { users } = this.state;

        //Multi-language
        let text1;
        
    
        if (this.props.lang === true) {
          text1 = "Loading users...";
        } else {
          text1 = "Cargando usuarios...";
        }

    return (
      <div className="users-list-component">
        <SearchBar
          search={e => this.searchUsers(e)}
          onkey={e => this.onKeyDown(e)}
          lang={this.props.lang}
        ></SearchBar>
        <div className="users-list">
          {users && this.displayUsers()}
          {!users && <p>{text1}</p>}
        </div>
        <Link to="/new">
          <div className="add-user-container">
            <img
              className="add-user-logo"
              src="/images/add-user.svg"
              alt="Logo"
            ></img>
          </div>
        </Link>
      </div>
    );
  }
}

export default UserList;
