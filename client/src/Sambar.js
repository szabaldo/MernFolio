import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext, ModalContext } from './App.js';

function Sambar() {
  const { user, setUser } = useContext(UserContext);
  const { modalList, setModalList } = useContext(ModalContext);
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

  const accountClick = () => {
    const content = (
      <Container>
        <Row>
          <h1>Account</h1>
        </Row>
        <Row>
          <h3>Delete Account</h3>
        </Row>
      </Container>
    );

    console.log(`${document.getElementById("sambar").getBoundingClientRect().height}px !important`)
    const params = {
      inner: content,
      width: "dialog-width", 
      left: document.getElementById("accountArrow").getBoundingClientRect().x,  
      top: `62px !important`,
      animStart: "fall-fade-middle", 
      animEnd: "fall-fade-middle-out"
    }

    setModalList(modalList.concat(params));
  }

  return (
    <Navbar expand="lg" className="bg-secondary slide-right" id="sambar">
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
            {user && (
              <div>
                <u className="cursor-pointer" onClick={accountClick}>
                  <h5 className="d-flex align-items-center justify-content-center nav-link large-text m-0 position-relative h-0 t-50">
                    {user.fname}
                  </h5>
                  <img src="down_arrow.svg" className="d-flex l-0 r-0 mx-auto invert-color position-relative" style={{ width: "30px", top: "65%" }} id="accountArrow"/>
                </u>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Sambar;