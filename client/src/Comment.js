import React, { useContext } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap'; 
import { useLocation } from 'react-router-dom';

function Comment({comment}) {
    const location = useLocation(); 
    const onAdminPage = location.pathname == "/admin"; 
    const status = comment.status; 

    let bgColor = "white";
    if (onAdminPage) {
        switch(status) {
            case "pending": 
                bgColor = "lightblue";
                break;
            case "approved": 
                bgColor = "forestgreen";
                break;
            case "hidden": 
                bgColor = "darkgrey";
                break;
            default: 
                bgColor = "orange";
        }
    }

    const date = new Date(comment.dateposted)
        .toLocaleString(
            'default', 
            {
                month: 'short', 
                day: "numeric", 
                year: "numeric"
            }
        );

    return(
        <div>
            <Container className="p-3 border borer-secondary rounded shadow" style={{backgroundColor: bgColor}}>
                <Row>
                    <Col>
                        <h5 className="medium-text">{comment.fname} {comment.lname}</h5>
                    </Col>
                    {onAdminPage && (
                        <Col>
                            <h1 className="large-text">{comment.status}</h1>
                        </Col>
                    )}
                    <Col className="d-flex flex-row-reverse">
                        <p>{date}</p>
                    </Col>
                </Row>
                <Row>
                    <h3 className="large-text">{comment.comment}</h3>
                </Row>
            </Container>
        </div>
    );
}

export default Comment;