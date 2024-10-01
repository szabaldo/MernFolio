import React, { useContext } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CommentsPane from './CommentsPane.js';
import Header from './Header.js';
import { UserContext } from './App.js';


function Home() {
    const { user, setUser } = useContext(UserContext);
    const isIntro = useOutletContext(); 

    const headerOpts = user ? { subtitle: "", linkText: "", linkTo: "" } : { subtitle: "You are not logged in", linkText: "Log in", linkTo: "/login" }

    const submitComment = async () => {
        const response = await fetch(process.env.ORIGIN + "/comment", {
            body: JSON.stringify({ comment: document.getElementById("commentField").value }),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);
        document.getElementById("commentField").value = ""; 
    }

    const commentBox = (
        <div className={`${isIntro.current ? "rise-fade-dvs" : ""}`}>
            <Container>
                <Form>
                    <Row>
                        <Form.Label className="d-flex justify-content-center large-text">Want to leave a comment?</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control type="text" placeholder="Comment..." id="commentField" />
                    </Row>
                </Form>
                <Row className="m-3">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={submitComment}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );

    return (
        <div>
            <Header
                title="Home"
                subtitle={headerOpts.subtitle}
                linkText={headerOpts.linkText}
                linkTo={headerOpts.linkTo}
            />
            <img src="portrait.jpg" className={`d-flex align-items-center m-auto portrait ${isIntro.current ? "rise-fade-ds" : ""}`} />
            {user && commentBox}
            <Container>
                <Row className="py-5">
                    <CommentsPane status="approved" />
                </Row>
            </Container>
            <Outlet />
        </div>
    );
}

export default Home;