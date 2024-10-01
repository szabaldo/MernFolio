import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from './App.js';

function Sambar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutClick = async () => {
    const response = await fetch(process.env.ORIGIN + "/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const res = await response.json();
    console.log(res);
    if (res.username == null) {
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
    <Navbar expand="lg" className="bg-secondary slide-right">
      <Container className="fade-in-dm">
        <Row className="w-100">
          <Col className="d-flex">
            <Link to="/" className="navbar-brand large-text">Sam Zabaldo</Link>
            {adminLink}
          </Col>
          <Col className={"d-flex flex-row-reverse"}>
            {user ? (
              <Link className="d-flex align-items-center nav-link medium-text mx-3" onClick={logoutClick}>Log out</Link>
            ) : (
              <Link className="d-flex align-items-center nav-link medium-text mx-3" to="/login"          >Log in </Link>
            )}

            {user && <h5 className="d-flex align-items-center nav-link flex-row-reverse large-text h-100">{user.fname}</h5>}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Sambar;