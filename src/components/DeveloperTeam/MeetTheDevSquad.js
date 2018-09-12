import React, { Component } from "react";
import { Media, Row, Container, Col } from "reactstrap";
import jake from "./jake.jpg";
import robert2 from "./robert2.jpg";
import harlyn from "./harlyn.jpg";
import jermy from "./jermy.jpg";
import "./MeetTheDevSquad.css";

import WOW from "wowjs";

class MeetTheDevSquad extends Component {
  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();
  }

  render() {
    return (
      <div>
        <br />
        <Container fluid class className="meetDevCon">
          <Row>
            <Col>
              <Media
                classname="aboutMeDiv"
                className="content wow fadeInUp "
                data-wow-duration="2s"
                data-wow-offset="200"
                body
                align="middle"
              >
                <h6 heading className="">
                  {" "}
                  Chief Data Flow Officer
                </h6>
                <hr className="hrDev" />
                <h4 heading className="pretty">
                  Jake Wymer
                </h4>
                <p className="aboutMe">
                  I am a full-stack software engineer who specializes in
                  building awesome web applications. I have been coding for over
                  six years, turning what began as a hobby into a profession I
                  love. I am a perpetual learner who enjoys solving everyday
                  problems with software and tinkering with new technologies.
                </p>
                <h5 className="visitMe">
                  {" "}
                  Visit me @ :{" "}
                  <a href="https://github.com/JakeWymer" target="_blank">
                    {" "}
                    GitHub{" "}
                  </a>{" "}
                  <a
                    href="https://www.linkedin.com/in/jake-wymer/"
                    target="_blank"
                  >
                    {" "}
                    LinkedIn{" "}
                  </a>
                </h5>
                <br />
              </Media>
            </Col>
            <Col className="aboutPicCol">
              <Media className="aboutPic">
                <img
                  className=" img-fluid"
                  style={{ width: "100%" }}
                  src={jake}
                  alt="Food"
                />
              </Media>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container fluid className="meetDevCon">
          <Row>
            <Col className="aboutPicCol">
              <Media className="aboutPic">
                <img style={{ width: "100%" }} src={robert2} alt="Food" />
              </Media>
            </Col>
            <Col>
              <Media
                classname="aboutMeDiv"
                className="content wow fadeInRight "
                data-wow-duration="2s"
                data-wow-offset="300"
                body
                align="middle"
              >
                <h6 heading className="">
                  {" "}
                  Chief Design Officer
                </h6>
                <hr className="hrDev" />
                <Media heading className="pretty">
                  Robert Hunnicutt
                </Media>
                <p className="aboutMe">
                  I build interactive, astonishing and feature rich responsive
                  website solutions for business or personal. Freelancer web
                  designer at heart, headquartered in Central FL currently in
                  Dallas TX. Formally studied development at Dev Mountain. Full
                  stack dev with a love and passion for design and data flow.
                </p>
                <h5 className="visitMe">
                  {" "}
                  Visit me @ :{" "}
                  <a href="https://github.com/treygithub" target="_blank">
                    {" "}
                    GitHub{" "}
                  </a>{" "}
                  <a
                    href="https://www.linkedin.com/in/robert-hunnicutt-8285ba16a/"
                    target="_blank"
                  >
                    {" "}
                    LinkedIn{" "}
                  </a>{" "}
                  <a href="http://www.hunecut.com" target="_blank">
                    {" "}
                    Portfolio{" "}
                  </a>
                </h5>
                <br />
              </Media>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container fluid className="meetDevCon">
          <Row>
            <Col>
              <Media
                classname="aboutMeDiv"
                className="content wow fadeInLeft "
                data-wow-duration="2s"
                data-wow-offset="300"
                body
                align="middle"
              >
                <h6 heading className="">
                  {" "}
                  Chief Creative Officer
                </h6>
                <hr className="hrDev" />
                <Media heading className="pretty">
                  Harlan Heath
                </Media>
                <p className="aboutMe">
                  My name is Harlan Heath and I am currently breaking into the
                  world of Web Development. I started out in the IT field doing
                  Desktop Support and while planning the next step in my career,
                  I discovered my passion for web development. During my
                  research I became eager to start in a field where people focus
                  on collaboration, is mentally engaging, and varies day by day
                  with new problems to solve. After completing a rigorous
                  immersive web development program, I feel like I'm ready to
                  continue learning, building, and developing a new career.
                </p>
                <h5 className="visitMe">
                  {" "}
                  Visit me @ :{" "}
                  <a href="https://github.com/HarlanHeath" target="_blank">
                    {" "}
                    GitHub{" "}
                  </a>{" "}
                  <a
                    href="https://www.linkedin.com/in/harlan-heath/"
                    target="_blank"
                  >
                    {" "}
                    LinkedIn{" "}
                  </a>
                </h5>
                <br />
              </Media>
            </Col>
            <Col className="aboutPicCol">
              <Media className="aboutPic">
                <img style={{ width: "100%" }} src={harlyn} alt="Food" />
              </Media>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container fluid>
          <Row className="meetDevCon">
            <Col className="aboutPicCol">
              <Media className="aboutPic">
                <img style={{ width: "100%" }} src={jermy} alt="Food" />
              </Media>
            </Col>
            <Col>
              <Media
                classname="aboutMeDiv"
                className="content wow fadeInRight "
                data-wow-duration="2s"
                data-wow-offset="300"
                body
                align="middle"
              >
                <h6 heading className="">
                  {" "}
                  Chief Brand Officer
                </h6>
                <hr className="hrDev" />
                <Media heading className="pretty">
                  Jeremy Blakley
                </Media>
                <p className="aboutMe">
                  I've lived throughout Asia for 18 years working with various
                  charities and NGOs. I'm comfortable working in international
                  settings with team members from around the world. I have a
                  passion to help those less fortunate. And I believe working in
                  web development can help make the world a better place. I made
                  the decision to get into coding to give me one more tool to
                  aid the types of work I've been involved in.
                </p>
                <h5 className="visitMe">
                  {" "}
                  Visit me @ :{" "}
                  <a href="https://github.com/blermyjake" target="_blank">
                    {" "}
                    GitHub{" "}
                    <a
                      href="https://blermyjake.github.io/myPortfolio/"
                      target="_blank"
                    >
                      {" "}
                      Portfolio{" "}
                    </a>
                  </a>
                </h5>
                <br />
              </Media>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default MeetTheDevSquad;
