import React from 'react'; 
import { Container, Row, Col } from 'react-bootstrap'; 

function Comment({comment}) {
    return(
        <div>
            <Container className="p-3 border borer-secondary rounded shadow bg-white">
                <Row>
                    <Col>
                        <h5 className="medium-text">{comment.fname} {comment.lname}</h5>
                    </Col>
                    <Col className="d-flex flex-row-reverse">
                        <p>Sept. 9, 2024</p>
                    </Col>
                </Row>
                <Row>
                    <h3 className="large-text">{comment.comment}</h3>
                    <p>{comment.id}</p>
                </Row>
            </Container>
        </div>
    );
}

export default Comment;