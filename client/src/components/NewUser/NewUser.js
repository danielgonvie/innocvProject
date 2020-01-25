import React, { Component } from 'react'
import UserService from '../../services/UserService';
import Button from 'react-bootstrap/Button';
import './NewUser.scss'

export default class NewUser extends Component {

    constructor(props){
        super(props);
        this.userService = new UserService();
        this.state= {
            users: [],
            user:{
                name: "",
                birthdate: "",
            }
            
        }
    }

    handleChangeName = e => {
        const { name, value } = e.target;
        this.setState({ ...this.state, user: {[name]: value}, confirm: false });
      };

      handleChangeBirthdate = e => {
        const { name, value } = e.target;
        this.setState({ ...this.state, user: {[name]: value}, confirm: false });
      };

    pushUser = (e, name, birthdate) => {
        e.preventDefault()
        this.userService.newUser(name, birthdate)
        let usersArr = this.state.users
        usersArr.push(this.state.user)
        /* this.setState({...this.state, users: usersArr, user: {name:"", birthdate:""}})    */  
    }
    

    render() {
        return (
            <div className="add-new-user-panel">
                <div className="add-new-user">
                <h1 className="add-user-title">Add user</h1>
                <form className="add-user-form" onSubmit={e => this.pushUser(e, this.state.user.name, this.state.user.birthdate)} >
                 <input type="text" name="name" value={this.state.user.name} onChange={e => this.handleChange(e)}  className="add-user-name" placeholder="Name"></input>
                 <input type="date" name="birthdate" value={this.state.user.birthdate} onChange={e => this.handleChange(e)} className="add-user-date"></input>
                <Button variant="primary" className="add-user-button"><input className="input-button" type="submit" value="Add user!"/></Button>
        </form>
        </div>
            </div>
        )
    }
}
