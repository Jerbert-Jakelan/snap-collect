import React, {Component} from 'react';
import { Media, Row, Container, Col} from 'reactstrap';
import jake from './jake.jpg';
import robert from './robert.jpg';
import harlyn from './harlyn.jpg'
import jermy from './jermy.jpg';
import './MeetTheDevSquad.css';

import WOW from 'wowjs';

class MeetTheDevSquad extends Component {

    componentDidMount() {
        const wow = new WOW.WOW();
        wow.init();
     }

render(){
return(
<div>
   <Container fluid>
                <Row>
                    <Col >
                        <Media className="content wow fadeInUp " data-wow-duration="2s" data-wow-offset="200" body align="middle">
                            <h6 heading className=""> Chief Data Flow Officer</h6>
                            <hr className="hrDev" />
                            <h4 heading className="pretty">Jake Wymer</h4>
                            <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                                fringilla. Donec lacinia congue felis in faucibus.
                            </p>  
                            <h5> Visit me @ : <a href="https://github.com/JakeWymer"> gitHub </a> <a href="https://www.linkedin.com/in/jake-wymer/"> LinkedIn </a></h5>
                            <br/>   
                        </Media>
                    </Col>
                     <Col >   
                        <Media>
                            <img className=" img-fluid" style={{ width:'100%',height:'100vh '}} src={jake} alt="Food" />
                        </Media>
                     </Col> 
                </Row>
    </Container> 

            <Container fluid>
                <Row>
                        <Col  >
                        
                            <Media >
                                <img style={{ width:'100%',height:'100vh'}} src={robert} alt="Food" />
                            </Media>
                        </Col>
                        <Col  >   
                        <Media className="content wow fadeInRight " data-wow-duration="2s" data-wow-offset="300"  body align="middle">
                        <h6 heading className=""> Chief Design Officer</h6>
                        <hr className="hrDev"/>
                            <Media heading className="pretty">Robert Hunnicutt</Media>
                            <p>
                            I build interactive, astonishing and feature rich responsive website solutions for business or personal. Freelancer web designer at heart, headquartered in Central FL currently in Dallas TX. Formally studied development at Dev Mountain. Full stack dev with a love and passion for design and data flow.
                            </p>
                            <h5> Visit me @ : <a href="https://github.com/treygithub"> gitHub </a> <a href="https://www.linkedin.com/in/robert-hunnicutt-8285ba16a/"> LinkedIn </a> <a href="http://www.hunecut.com"> Portfolio </a></h5>
                            <br/>
                        </Media>
                     </Col>   
                </Row>
            </Container>

             <Container fluid>
                <Row>
                    <Col >
                        <Media className="content wow fadeInLeft " data-wow-duration="2s" data-wow-offset="300" body align="middle">
                        <h6 heading className=""> Chief Creative Officer</h6>
                        <hr className="hrDev"/>
                            <Media heading className="pretty">Harlan Heath</Media>
                            <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                                fringilla. Donec lacinia congue felis in faucibus.
                            </p>
                            <h5> Visit me @ : <a href="https://github.com/HarlanHeath"> gitHub </a> <a href="https://www.linkedin.com/in/harlan-heath/"> LinkedIn </a></h5>
                            <br/>
                        </Media>
                    </Col>
                     <Col >   
                        <Media  >
                            <img style={{ width:'100%',height:'100vh '}} src={harlyn} alt="Food" />
                        </Media>
                     </Col> 
                </Row>
            </Container>

        <Container fluid>
                <Row>
                        <Col  >
                        
                            <Media >
                                <img style={{ width:'100%',height:'100vh'}} src={jermy} alt="Food" />
                            </Media>
                        </Col>
                        <Col  >   
                        <Media className="content wow fadeInRight " data-wow-duration="2s" data-wow-offset="300"  body align="middle">
                        <h6 heading className=""> Chief Brand Officer</h6>
                        <hr className="hrDev"/>
                            <Media heading className="pretty">Jermy Blermy</Media>
                            <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                                fringilla. Donec lacinia congue felis in faucibus.
                            </p>
                            <h5> Visit me @ : <a href="https://github.com/blermyjake"> gitHub </a></h5>               
                            <br/>
                        </Media>
                     </Col>   
                </Row>
        </Container>
</div>
)
}
}
export default MeetTheDevSquad;