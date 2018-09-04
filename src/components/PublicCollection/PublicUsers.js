import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';
import axios from 'axios';
import PublicUsersView from './PublicUsersView';


class PublicUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
          users:[],
          input:''
        }
        this.updateUsers = this.updateUsers.bind(this)
      }

      componentDidMount = async() => {
        this.getUsers();
      };

      getUsers = () => {
        axios.get('/api/getAllUsers')
        .then(res => {
          this.setState({
            users:res.data
          })
        })
      }

      updateUsers = users => {
        this.setState({users});
      }

    handleInput = (val) => {
        this.setState({
          input: val.toLowerCase()
        });
      }
    
      render() {
        const { input } = this.state;
        let UsersSearch = this.state.users
          .filter(
            e =>
              e.name.toLowerCase().includes(input) ||
              e.city.toLowerCase().includes(input) ||
              e.state.toLowerCase().includes(input)
          )
          .map((e, i) => {
            return (
              <PublicUsersView
              index={i}
              key={e.user_id}
              name={e.name}
              pic={e.profile_pic}
              city={e.city}
              state={e.state}
              />
            )})

        return (
          <div className="collection-home">
                <input
                className="inputSearch"
                placeholder=" public users search"
                onChange={event => this.handleInput(event.target.value)}
                />
            <div className="card-wrapper"> {UsersSearch} </div>
        </div>
    )
}
}
export default PublicUsers;