import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext, ModalContext } from './App.js';
import Modal from './Modal.js';

function Sambar({ id }) {
  const { user, setUser } = useContext(UserContext);
  const modalList = useContext(ModalContext);
  const [accountModal, setAccountModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
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
            duration: { duration: 125, fill: "forwards"}
          }, 
          { 
            keyframes: { 
              transform: ["translateY(0px)", "translateY(-25px)"] 
            }, 
            duration: { duration: 250, fill: "forwards"}
          }
        ] 
      }
      style={{
        marginTop: document.getElementById("sambar")?.getBoundingClientRect().height / 2,
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
          <h1 className="xl-text d-flex justify-content-center">Account</h1>
        </Row>
        <Row>
          <Button className="w-fit-content m-auto" onClick={() => { setDeleteAccountModal(true); }} variant="danger">Delete Account</Button>
        </Row>
      </Container>
    </Modal>
  );

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
            duration: { duration: 500, fill: "forwards"}
          }, 
          { 
            keyframes: { 
              transform: ["translateY(0px)", "translateY(-100px)"] 
            }, 
            duration: { duration: 500, fill: "forwards"}
          }
        ] 
      }
      style={{ left: "0px", right: "0px", top: "200px", width: "800px" }}
      positionStyle={{ 
        left: 0, 
        right: 0
      }}
    >
      <h1>hi</h1>
    </Modal>
  );

  return (
    <>
    <Navbar expand="lg" className="bg-secondary slide-right" id={id}>
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
        {/* {accountModal && accountModalElement}
        {deleteAccountModal && deleteAccountModalElement} */}
      </Container>
      
    </Navbar>
    {accountModal && accountModalElement}
    {deleteAccountModal && deleteAccountModalElement}
    </>
  );
}

export default Sambar;