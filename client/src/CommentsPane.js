import React, { useEffect, useState } from 'react';
import Comment from './Comment.js';
import { UserContext } from './App.js';
import { Container, Row, Col, Button } from 'react-bootstrap';

function CommentsPane({ status, commentButtons = false }) {
    const noCommentsMessage = (
        <div>
            <h1 className="xl-text d-flex justify-content-center">Comments</h1>
            <h3 className="large-text d-flex justify-content-center">There are no comments right now.</h3>
        </div>
    );

    const [commentsElements, setCommentsElements] = useState(noCommentsMessage);
    const [comments, setComments] = useState([]);

    const approveClick = async (event) => {
        const commentId = event.target.id;
        const response = await fetch("http://localhost:8080/approve", {
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
        const response = await fetch("http://localhost:8080/hide", {
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
        const response = await fetch("http://localhost:8080/delete", {
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
            const response = await fetch("http://localhost:8080/get-comments", {
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
    }, []);

    useEffect(() => {
        let c = noCommentsMessage;
        if (comments.length > 0) {
            c = comments.map((comment) =>
                <Row className="m-3" key={comment.id} id={"row" + comment.id}>
                    <Col>
                        <Comment comment={comment} />
                    </Col>
                    {commentButtons && (<Col xs={3} className="d-flex align-items-center flex-row-reverse">
                        <Container>
                            {(comment.status != "approved") && (<Row className="m-1">
                                <Button variant="success" className="small-text" onClick={(e) => { approveClick(e) }} id={comment.id}>Approve</Button>
                            </Row>)}
                            {(comment.status != "hidden") && (<Row className="m-1">
                                <Button variant="secondary" className="small-text" onClick={(e) => { hideClick(e) }} id={comment.id}>Hide</Button>
                            </Row>)}
                            <Row className="m-1">
                                <Button variant="danger" className="small-text" onClick={(e) => { deleteClick(e) }} id={comment.id}>Delete</Button>
                            </Row>
                        </Container>
                    </Col>)}
                </Row>
            );
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
