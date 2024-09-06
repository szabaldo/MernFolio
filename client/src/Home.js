import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import CommentsPane from './CommentsPane.js';
import Header from './Header.js';
import { UserContext } from './App.js'; 


function Home() {
    const {user, setUser} = useContext(UserContext); 

    const headerOpts = user ? {subtitle: "", linkText: "", linkTo: ""} : {subtitle: "You are not logged in.", linkText: "Log in", linkTo: "/login"}

    return (
        <div>
            <Header 
                title="Home" 
                subtitle={headerOpts.subtitle}
                linkText={headerOpts.linkText} 
                linkTo={headerOpts.linkTo}
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