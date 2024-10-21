import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CommentsPane from './CommentsPane.js';
import Header from './Header.js';
import { UserContext, IntroContext } from './App.js';
import Modal from './Modal.js';

function Home() {
    const { user, setUser } = useContext(UserContext);
    // const isIntro = useOutletContext();
    const isIntro = useContext(IntroContext);
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

    useEffect(() => { // TODO turn this animation useEffect into a custom hook
        if (isIntro.current) {
            let elements = [];
            elements.push(document.getElementById("portrait"));
            elements.push(document.getElementById("commentBox"));
            for (const element of elements) {
                element?.animate({
                    transform: ["translateY(250px)", "translate(0px)"],
                    opacity: [0, 1]
                }, {
                    duration: Math.ceil(Math.random() * 1000),
                    easing: "ease",
                });
            }
        }
    });

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const commentBox = (
        <div id="commentBox">
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
            {commentSubmitted && <Modal
                modalId="commentBox"
                onClose={() => { setCommentSubmitted(false); }}
                animStart={
                    [
                        { 
                            keyframes: {
                                opacity: [0, 1]
                            }, 
                            duration: {
                                duration: 250,
                                fill: "forwards",
                                easing: "ease"
                            }  
                        }, 
                        { 
                            keyframes: {
                                transform: ["translateY(-50px) scale(110%)", "translateY(0px) scale(100%)"]
                            }, 
                            duration: {
                                duration: 250,
                                fill: "forwards",
                                easing: "ease"
                            } 
                        }
                    ]
                }
                animEnd={
                    [
                        { 
                            keyframes: {
                                opacity: [0], 
                                transform: ["translateY(0px) scale(100%)", "translateY(35px) scale(90%)"]
                            },
                            duration: {
                                duration: 300,
                                fill: "forwards",
                                easing: "ease"
                            } 
                        }
                    ]
                }
                style={{
                    width: "512px",
                }}
            >
                <Container>
                    <Row className="py-1">
                        <h2 className="large-text d-flex justify-content-center">Thanks!</h2>
                        <br />
                        <p className="medium-text d-flex justify-content-center">Your comment is under review and will appear on the website once approved.</p>
                    </Row>
                </Container>
            </Modal>}
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
            <img src="portrait.jpg" className="d-flex align-items-center m-auto mb-3 portrait" id="portrait"/>
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