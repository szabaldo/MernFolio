import React, { useContext, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CommentsPane from './CommentsPane.js';
import Header from './Header.js';
import { UserContext } from './App.js';

function Home() {
    const { user, setUser } = useContext(UserContext);
    const isIntro = useOutletContext();
    const [comment, setComment] = useState("");
    const [commentSubmitted, setCommentSubmitted] = useState(false);

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
        setComment("");
        setCommentSubmitted(true);
    }

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleCloseConfirm = () => {
        let confirmBox = document.getElementById("commentConfirm");
        confirmBox.classList.remove("rise-fade-middle");
        confirmBox.offsetHeight;
        confirmBox.classList.add("rise-fade-middle-out");
        let darkBackground = document.getElementById("darkBackground");
        darkBackground.classList.remove("fade-in-50");
        darkBackground.offsetHeight;
        darkBackground.classList.add("fade-out-50");
        setTimeout(() => {
            confirmBox.classList.remove("rise-fade-middle-out");
            confirmBox.offsetHeight;
            confirmBox.classList.add("rise-fade-middle");
            darkBackground.classList.remove("fade-out-50");
            darkBackground.offsetHeight;
            darkBackground.classList.add("fade-in-50");
            setCommentSubmitted(false);
        }, 1000);
    }

    const commentBox = (
        <div className={`${isIntro.current ? "rise-fade-dvs" : ""}`} id="commentBox">
            {commentSubmitted && (
                <div>
                    <div className="fade-in-50" style={{ position: "absolute", width: "100vw", height: "100vh", backgroundColor: "black", top: 0, left: 0, zIndex: 1 }} id="darkBackground" />
                    <div className="rise-fade-middle position-fixed p-3 mx-auto rounded border shadow inner-width bg-white r-0 l-0" id="commentConfirm" style={{ zIndex: 2, filter: "blur(-20px)" }}>
                        <Container>
                            <Row className="py-1">
                                <h2 className="large-text d-flex justify-content-center">Thanks!</h2>
                                <br />
                                <p className="medium-text d-flex justify-content-center">Your comment is under review and will appear on the website once approved.</p>
                            </Row>
                            <Row className="py-1">
                                <Col className="d-flex justify-content-center">
                                    <Button onClick={handleCloseConfirm}>Close</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            )}
            <Container>
                <Form>
                    <Row>
                        <Form.Label className="d-flex justify-content-center large-text">Want to leave a comment?</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control type="text" placeholder="Comment..." id="commentField" onChange={handleChange} />
                    </Row>
                </Form>
                <Row className="m-3">
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={submitComment} value={comment} disabled={comment == ""}>
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
            <img src="portrait.jpg" className={`d-flex align-items-center m-auto mb-3 portrait ${isIntro.current ? "rise-fade-ds" : ""}`} />
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