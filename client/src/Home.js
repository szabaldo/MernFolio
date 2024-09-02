import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CommentsPane from './CommentsPane.js';
import Header from './Header.js';


function Home() {
    return (
        <div>
            <Header 
                title="Home" 
                subtitle="You are not logged in." 
                linkText="Log in" 
                linkTo="/login" 
            />
                <Container>
                <Row className="py-5">
                    <CommentsPane>
                    </CommentsPane>
                </Row>
            </Container>
            <Outlet />
        </div>
    );
}

export default Home;