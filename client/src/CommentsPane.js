import React, { useEffect, useState, useContext } from 'react';
import Comment from './Comment.js';
import { UserContext } from './App.js';
import { Container, Row, Col, Button } from 'react-bootstrap';


function CommentsPane({ status, admin = false }) {
    const noCommentsMessage = (
        <div>
            <h1 className="xl-text d-flex justify-content-center">Comments</h1>
            <h3 className="large-text d-flex justify-content-center">There are no comments right now.</h3>
        </div>
    );

    const [commentsElements, setCommentsElements] = useState(noCommentsMessage);
    const [comments, setComments] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const approveClick = async (event) => {
        const commentId = event.target.id;
        const response = await fetch(process.env.BASE_URL + "/approve", {
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
        const response = await fetch(process.env.BASE_URL + "/hide", {
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
        const response = await fetch(process.env.BASE_URL + "/delete", {
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
            const response = await fetch(process.env.BASE_URL + "/get-comments", {
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
                )
            });
        }
        setCommentsElements(c);
    }, [comments])

    return (
        <div>
            <Container className="border border-secondary rounded" id="pane" >
                {commentsElements}
            </Container>
        </div>
    );
}

export default CommentsPane;
