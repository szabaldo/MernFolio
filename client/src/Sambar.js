import React, { useContext, useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext, IntroContext, PreferencesContext } from './App.js';
import Modal from './Modal.js';

function Sambar({ id }) {
  const location = useLocation();
  const isIntro = useContext(IntroContext);
  const { user, setUser } = useContext(UserContext);
  const [accountModal, setAccountModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const {preferences, setPreferences} = useContext(PreferencesContext); 
  const navigate = useNavigate();

  useEffect(() => { // TODO turn this animation useEffect into a custom hook
    if (isIntro.current && location.pathname == "/") {
      let elements = [];
      elements.push(document.getElementById("sambar"));
      for (const element of elements) {
        element?.animate({
          transform: ["translateX(-100vw)", "translateX(0)"],
          opacity: [0, 1]
        }, {
          duration: Math.ceil((Math.random() * 1000) + 250),
          easing: "ease",
        });
      }
    }
  });

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
    setPreferences({showUserCommentsOnly: false})
  };

  let adminLink;
  if (user?.isadmin) {
    adminLink = (<Link className="d-flex align-items-center nav-link h-100" to="/admin">Admin</Link>);
  } else {
    adminLink = null;
  }

  const accountModalElement = (
    <Modal
      modalId="account"
      onClose={() => { setAccountModal(false); }}
      animStart={
        [
          {
            keyframes: {
              opacity: [0, 1]
            },
            duration: 250
          },
          {
            keyframes: {
              transform: ["translateY(-25px)", "translate(0px)"]
            },
            duration: 250
          }
        ]
      }
      animEnd={
        [
          {
            keyframes: {
              opacity: [0]
            },
            duration: { duration: 125, fill: "forwards" }
          },
          {
            keyframes: {
              transform: ["translateY(0px)", "translateY(-25px)"]
            },
            duration: { duration: 250, fill: "forwards" }
          }
        ]
      }
      style={{
        width: "512px"
      }}
      positionStyle={{
        flexDirection: "row-reverse",
        left: 0,
        right: 0
      }}
      disableScroll={true}
    >
      <Container>
        <Row>
          <h1 className="xl-text d-flex justify-content-center mb-3">Account</h1>
          <hr className="solid" />
        </Row>
        <Row className="px-3 pb-3 d-flex justify-content-center large-text">
          <Form>
            <Form.Switch label="Show only your comments" reverse={true} checked={preferences.showUserCommentsOnly != null ? preferences.showUserCommentsOnly : false} className="w-fit-content mx-auto" onChange={(e) => {setPreferences({showUserCommentsOnly: e.target.checked}); localStorage.showUserCommentsOnly = e.target.checked; }} />
          </Form>
        </Row>
        <Row>
          <Button className="w-fit-content m-auto" onClick={() => { setDeleteAccountModal(true); }} variant="danger">Delete Account</Button>
        </Row>
      </Container>
    </Modal>
  );

  const handleDeleteAccount = async () => {
    const response = await fetch(process.env.ORIGIN + "/delete-account", {
      method: "DELETE",
      body: JSON.stringify({userid: user.id}),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const res = await response.json();
    console.log(response);
    if (response.status == 200) {
      logoutClick();
      window.location.reload(); 
    }
  }

  const deleteAccountModalElement = (
    <Modal
      modalId="deleteAccount"
      onClose={() => { setDeleteAccountModal(false); }}
      animStart={
        [
          {
            keyframes: {
              opacity: [0, 1]
            },
            duration: 250
          },
          {
            keyframes: {
              transform: ["translateY(25px)", "translate(0px)"]
            },
            duration: 250
          }
        ]
      }
      animEnd={
        [
          {
            keyframes: {
              opacity: [0]
            },
            duration: { duration: 500, fill: "forwards" }
          },
          {
            keyframes: {
              transform: ["translateY(0px)", "translateY(-100px)"]
            },
            duration: { duration: 500, fill: "forwards" }
          }
        ]
      }
      style={{ width: 512 }}
    >
      <Container>
        <Row className="mb-3">
          <h1 className="xl-text d-flex justify-content-center mb-3">Are you sure?</h1>
        </Row>
        <Row className="d-flex justify-content-center mx-auto">
          <p className="large-text">This will also delete all of your comments</p>
        </Row>
        <Row>
          <Button className="w-fit-content m-auto" style={{ width: 150 }} onClick={handleDeleteAccount} variant="danger">Delete Account</Button>
        </Row>
      </Container>
    </Modal>
  );

  return (
    <>
      <Navbar expand="lg" className="bg-secondary" id={id}>
        <Container id="navContainer">
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
                  <u className="cursor-pointer" onClick={() => { setAccountModal(!accountModal); }}>
                    <h5 className="d-flex align-items-center justify-content-center nav-link large-text m-0 position-relative h-0 t-50">
                      {user.fname}
                    </h5>
                    <img src="down_arrow.svg" className="d-flex l-0 r-0 mx-auto invert-color position-relative" style={{ width: "30px", top: "65%" }} id="accountArrow" />
                  </u>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
      {accountModal && accountModalElement}
      {deleteAccountModal && deleteAccountModalElement}
    </>
  );
}

export default Sambar;