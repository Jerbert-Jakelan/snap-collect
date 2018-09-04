import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';
import axios from 'axios';
// import PublicCollectionAndUsersMapPassPropsView from './PublicCollectionAndUsersMapPassPropsView';



class Public extends Component{
    constructor(props){
        super(props);
        this.state = {
          publicCollection:[],
          input:''
        }
      }

      componentDidMount = async() => {
        this.getAllPublicCollections();
      };
    
      getAllPublicCollections = () => {
        axios.get('/api/getAllPublicCollections').then(payload =>{
          this.setState({
              publicCollection: payload.data
          })
        })
        }

    handleInput = (val) => {
        this.setState({
          input: val.toLowerCase()
        });
      }
    
      render() {
        // const { input } = this.state;
        // let collectionSearch = this.state.publicCollection
        //   .filter(
        //     e =>
        //         e.city.toLowerCase().includes(input) ||
        //         e.state.toLowerCase().includes(input) ||
        //         e.name.toLowerCase().includes(input) ||
        //         e.description.toLowerCase().includes(input) 
        //   )
        //   .map((e, i) => {
        //     return (
        //       <PublicCollectionAndUsersMapPassPropsView
        //       index={i}
        //       key={e.collection_id}
        //       collId={e.collection_id}
        //       image={e.collection_pic}
        //       name={e.name}
        //       description={e.description}
        //       />
        //     )})
console.log("**i am state**",this.state)

        return (
          <div className="collection-home">
                {/* <input
                className="inputSearch"
                placeholder="Search"
                onChange={event => this.handleInput(event.target.value)}
                />
            <div className="card-wrapper"> {collectionSearch} </div> */}
        </div>
    )
}
}
export default Public;