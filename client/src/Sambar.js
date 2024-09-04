import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './App.js'; 

function Sambar() {
  const {user, setUser} = useContext(UserContext); 
  
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
            <Link className="d-flex align-items-center nav-link" to="/login">{!user ? "Log in" : user}</Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Sambar;