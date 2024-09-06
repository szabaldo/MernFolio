import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './App.js'; 

function Sambar() {
  const {user, setUser} = useContext(UserContext); 

  const logoutClick = async () => {
    const response = await fetch("http://localhost:8080/logout", {
        method: "GET",
        headers: {"Content-Type": "application/json"}, 
        credentials: "include"
    });
    const res = await response.json(); 
    console.log(res); 
    if (res.username == undefined) console.log("weewoo"); setUser(null); 
  };

  let userStatus;
  if (user) {
    userStatus = (
    <Container>
      <Row>
        <Col>
          <h5 className="d-flex align-items-center nav-link flex-row-reverse large-text" to="/login">{user.fname}</h5>
        </Col>
        <Col>
          <Button className="d-flex align-items-center nav-link h-100 no-hover" onClick={logoutClick}>Log out</Button>
        </Col>
      </Row>
    </Container>)
  } else {
    userStatus = (<Link className="d-flex align-items-center nav-link" to="/login">Log in</Link>);
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Row className="w-100">
          <Col>
            {/* <Navbar.Brand href="#home">Sam Zabaldo</Navbar.Brand> */}
            <Link to="/" className="navbar-brand">Sam Zabaldo</Link>
          </Col>
          {/* <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col> */}
          <Col className={"d-flex flex-row-reverse"}>
            {userStatus}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Sambar;