import axios from 'axios';

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/users`,
      withCredentials: true
    })
  }

  fetchUsers = () => {
    return this.instance.get('/users')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  fetchOneUser = (id) => {
    return this.instance.get(`/users/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateUser = (id, name, birthdate) => {
    return this.instance.post(`/edit/${id}`, {name, birthdate})
    .then(res=> Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  deleteUser = (id) =>{
    return this.instance.post(`/delete/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

}

export default UserService;


