import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './App.js';

function Sambar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutClick = async () => {
    const response = await fetch(process.env.BASE_URL + "/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const res = await response.json();
    console.log(res);
    if (res.username == undefined) {
      setUser(null);
      navigate("/");
    }
  };

  let adminLink;
  if (user?.isadmin) {
    adminLink = (<Link className="d-flex align-items-center nav-link h-100" to="/admin">Admin</Link>);
  } else {
    adminLink = null;
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Row className="w-100">
          <Col>
            <Container>
              <Row>
                <Col>
                  <Link to="/" className="navbar-brand large-text">Sam Zabaldo</Link>
                </Col>
                <Col>
                  {adminLink}
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className={"d-flex flex-row-reverse"}>
            <Container>
              <Row className="h-100">
                <Col>
                  {user && <h5 className="d-flex align-items-center nav-link flex-row-reverse large-text">{user.fname}</h5>}
                </Col>
                <Col className="d-flex align-items-center">
                  {user ? (
                    <Link className="d-flex align-items-center nav-link medium-text" onClick={logoutClick}>Log out</Link> 
                  ) : (
                    <Link className="d-flex align-items-center nav-link medium-text" to="/login"          >Log in </Link>
                  )} 
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Sambar;