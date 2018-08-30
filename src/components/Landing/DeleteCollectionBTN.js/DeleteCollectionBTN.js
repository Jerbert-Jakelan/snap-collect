import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

class DeleteCollectionsBTN extends Component{
    constructor(props){
        super(props);
    }
    handleDeleteCollection = (id) => {
        axios.delete(`/api/deleteCollection/${id}`)
            .then(() => this.props.getCollections())
                .catch(err => console.log(err))
    }
    render(){
    return(
        <div>
            <Button onClick={ ()=> this.handleDeleteCollection(this.props.id)}>Delete</Button>
        </div>
    )
}
}
export default DeleteCollectionsBTN;