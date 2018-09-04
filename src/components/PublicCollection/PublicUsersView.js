import React, {Component} from 'react';
import '../CollectionDetail/CollectionDetail.css';


class PublicUsersView extends Component{
   
      render(props) {
          let {name,city,state,profile_pic}= this.props
        return (
            <div className="profileText">
              <div className="avatar" style={{ height: 75, width: 75 }}>
                <img src={profile_pic} alt="user pic" />
              </div>
             
              <div className="profileText2">
                <h2>{name}</h2>
                <h3>
                  {city}, {state}{" "}
                </h3>
                
              </div>
            </div>
          );
}
}
export default PublicUsersView;