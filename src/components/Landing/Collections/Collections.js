import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardBody, CardText } from 'reactstrap';
import {connect} from 'react-redux';
import {selectCollection} from '../../../ducks/reducer';


class Collections extends Component {
    render(){
        console.log(this.props)
    return (
      <div>
        <Card>
          <CardHeader>{this.props.name}</CardHeader>
          <CardBody>
            <div className="collections" >
              <Link to={`/collection/${this.props.collId}`}><img onClick={()=>this.props.selectCollection(this.props.collId)} style={{height:50, width:50}} alt="alt" src={this.props.image}/></Link>
            </div>
            <CardText>{this.props.description}</CardText>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps,{selectCollection})(Collections);