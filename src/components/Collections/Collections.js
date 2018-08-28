import React, {Component} from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

class Collections extends Component {
  render(){
  return (
    <div className="avatar" style={style}>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <CardTitle> My Collections</CardTitle>
          <img src={this.props.myCollection}/>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
}

export default Collections;