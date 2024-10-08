import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Header from './Header.js';
import { UserContext } from './App.js';
import CommentsPane from './CommentsPane.js';


function Account() {
    const { user, setUser } = useContext(UserContext);

    const headerOpts = user ? { subtitle: "", linkText: "", linkTo: "" } : { subtitle: "You shouldn't be able to see this page if you're not logged in.", linkText: "Something went wrong", linkTo: "/" }

    return (
        <div>
            <Container>
                
            </Container>
        </div>
    );
}

export default Account;