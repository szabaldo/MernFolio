import React, { useEffect, useContext, useState, useRef } from 'react';
import Comment from './Comment.js';
import { UserContext } from './App.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function CommentsPane({ status, commentButtons = false }) {
    const { user, setUser } = useContext(UserContext);
    const comments = useRef([]);
    const [commentsElements, setCommentsElements] = useState([]);

    const approveClick = async (event) => { 
        const commentId = event.target.id; 
        const response = await fetch("http://localhost:8080/approve", {
            body: JSON.stringify({commentId: commentId}),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);
        document.getElementById("row" + commentId).remove();  
    }

    const fetchComments = async () => {
        const response = await fetch("http://localhost:8080/get-comments", {
            body: JSON.stringify({ status: status }),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);
        const c = res.comments.map((comment) =>{
            console.log(comment);
            return(
            <Row className="m-3" key={comment.id} id={"row" + comment.id}>
                <Col>
                    <Comment comment={comment} />
                </Col>
                {commentButtons && (<Col xs={3} className="d-flex align-items-center flex-row-reverse">
                    <Container>
                        <Row className="m-1">
                            <Button variant="success" className="small-text" onClick={(e) => {approveClick(e)}} id={comment.id}>Approve</Button>
                        </Row>
                        <Row className="m-1">
                            <Button variant="secondary" className="small-text">Hide</Button>
                        </Row>
                        <Row className="m-1">
                            <Button variant="danger" className="small-text">Delete</Button>
                        </Row>
                    </Container>
                </Col>)}
            </Row>)}
        );
        comments.current = c;
        setCommentsElements(c); 
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div>
            <Container className="border border-secondary rounded" >
                {commentsElements}
            </Container>

        </div>
    );
}

export default CommentsPane;
