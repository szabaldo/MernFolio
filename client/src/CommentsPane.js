import React, { useEffect, useState, useContext } from 'react';
import Comment from './Comment.js';
import { UserContext, IntroContext } from './App.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

function CommentsPane({ status, admin = false }) {
    // const isIntro = useOutletContext();
    const isIntro = useContext(IntroContext); 
    const noCommentsMessage = (
        <div>
            <h1 className="xl-text d-flex justify-content-center">Comments</h1>
            <h3 className="large-text d-flex justify-content-center">There are no comments right now</h3>
        </div>
    );

    const [commentsElements, setCommentsElements] = useState(noCommentsMessage);
    const [comments, setComments] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (isIntro.current) {
            const commentsPane = document.getElementById("commentsPane");
            commentsPane.animate({
                transform: ["translateY(250px)", "translate(0px)"],
                opacity: [0, 1]
            }, {
                duration: Math.ceil(Math.random() * 1000),
                easing: "ease",
            });
        }
    }, []);

    const approveClick = async (event) => {
        const commentId = event.target.id;
        const response = await fetch(process.env.ORIGIN + "/approve", {
            body: JSON.stringify({ commentId: commentId }),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);

        let newComments = [];
        for (let c of comments) {
            if (c.id == commentId) {
                c.status = "approved";
            }
            newComments.push(c);
        }
        setComments(newComments);
    }

    const hideClick = async (event) => {
        const commentId = event.target.id;
        const response = await fetch(process.env.ORIGIN + "/hide", {
            body: JSON.stringify({ commentId: commentId }),
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);

        let newComments = [];
        for (let c of comments) {
            if (c.id == commentId) {
                c.status = "hidden";
            }
            newComments.push(c);
        }
        setComments(newComments);
    }

    const deleteClick = async (event) => {
        const commentId = event.target.id;
        const response = await fetch(process.env.ORIGIN + "/delete", {
            body: JSON.stringify({ commentId: commentId }),
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);

        let newComments = [];
        for (const c of comments) {
            if (c.id != commentId) {
                newComments.push(c);
            }
        }
        setComments(newComments);
    }

    useEffect(() => {
        async function fetchComments() {
            const response = await fetch(process.env.ORIGIN + "/get-comments", {
                body: JSON.stringify({ status: status }),
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const res = await response.json();
            console.log("");
            console.log("Comments fetched: ");
            console.log(res.comments);
            setComments(res.comments);
        }
        fetchComments()
    }, [user]);

    useEffect(() => {
        let c = noCommentsMessage;
        if (comments.length > 0) {
            c = comments.map((comment) => {
                const showApprove = admin && (comment.status != "approved");
                const showHide = admin && (comment.status != "hidden");
                const showDelete = admin || (user?.id == comment.userid);
                return (
                    <Row className="m-3" key={comment.id} id={"row" + comment.id}>
                        <Col>
                            <Comment comment={comment} />
                        </Col>
                        {(showApprove || showHide || showDelete) && (<Col xs={3} className="d-flex align-items-center flex-row-reverse">
                            <Container>
                                {showApprove && (<Row className="m-1">
                                    <Button variant="success" className="small-text" onClick={(e) => { approveClick(e) }} id={comment.id}>Approve</Button>
                                </Row>)}
                                {showHide && (<Row className="m-1">
                                    <Button variant="secondary" className="small-text" onClick={(e) => { hideClick(e) }} id={comment.id}>Hide</Button>
                                </Row>)}
                                {showDelete && (<Row className="m-1">
                                    <Button variant="danger" className="small-text" onClick={(e) => { deleteClick(e) }} id={comment.id}>Delete</Button>
                                </Row>)}
                            </Container>
                        </Col>)}
                    </Row>
                );
            });
        }
        setCommentsElements(c);
    }, [comments])

    return (
        <div id="commentsPane">
            <Container className="border border-secondary rounded" id="pane" >
                {commentsElements}
            </Container>
        </div>
    );
}

export default CommentsPane;
