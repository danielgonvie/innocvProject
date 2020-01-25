import React, { Component } from 'react'
import UserService from '../../services/UserService';
import Button from 'react-bootstrap/Button';

import './UserDetail.scss';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
            user: null,
            name: null,
            birthdate: null,
            confirm: false,
          }
      }
      
      
      

      displayUser = () => {
        const { user } = this.state;
        let date = this.state.birthdate
        date = date.split("")
        date.splice(10,20)

        return <React.Fragment> 
        <div className="user-info">
        <h1 className="user-title">Info</h1>
        <h1 className="user-name">{this.state.name}</h1>
        <h1 className="user-date">{date}</h1>
        </div>

        <div className="user-edit-info">
        <h1 className="user-edit-title">Edit</h1>
        <form className="user-edit-form" onSubmit={this.saveUser}>
        <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}  className="user-edit-name" placeholder="Name"></input>
        <input type="date" name="birthdate" value={this.state.birthdate} onChange={e => this.handleChange(e)} className="user-edit-date"></input>
        <Button variant="primary" className="edit-button"><input className="input-button" type="submit" value="Save changes!"/></Button>
        </form>
        </div>

        <Button variant="danger" className="delete-button"><button className="delete-user-button" onClick={(e) => this.deleteUser(e, this.state.user)}> DELETE USER!</button></Button>
        </React.Fragment>
        
      }
    
      componentDidMount() {
        this.updateUser()
        
      }
      
      updateUser = () => {
        this.userService.fetchOneUser(this.props.match.params.id)
          .then(
            (user) => {
              this.setState({ ...this.state, user, name: user.name, birthdate: user.birthdate })
              
            },
            (error) => {
              const { message } = error;
              console.error(message)
            }
          )
      }

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
          confirm: true,
        })
      };

      deleteUser = (e, user) => {
        const { history } = this.props;
        e.preventDefault()
        this.userService.deleteUser(user._id)
        .then((user) => {this.userService.fetchUsers().
            then(() => {
              this.setState({ user: null });
              history.push("/")
            },
            error => {
              console.error(error);
            }
          );
        })
    };


    render() {
        let confirm = <React.Fragment></React.Fragment>
        if (this.state.confirm === true){
            confirm = <h1 className="confirm-message">All changes saved!</h1>
        } 
        return (
            <div className="user-profile">
              {confirm}
                {this.state.user && this.displayUser()}
                 {!this.state.user && <p>Loading user info...</p> }
                 

            </div>
        )
    }
}