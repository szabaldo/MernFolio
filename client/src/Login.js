import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Header from './Header.js'; 
import { UserContext } from './App.js'; 

function Login() {
    const [usernameExists, setUsernameExists] = useState(true); 
    const [correctPassword, setCorrectPassword] = useState(true); 
    const [redirect, setRedirect] = useState(false); 
    const {user, setUser} = useContext(UserContext); 

    const onUsernameChange = () => {
        setUsernameExists(true); 
    };

    const onPasswordChange = () => {
        setCorrectPassword(true); 
    };

    const loginClick = async () => {
        const body = {
            username: document.getElementById("formUsername").value,
            password: document.getElementById("formPassword").value,
        };

        const response = await fetch("http://localhost:8080/login", {
            body: JSON.stringify(body), 
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            credentials: "include"
        });
        const data = await response.json();  
        console.log(data); 
        if (response.status == 200) {
            setUser(data.user); 
            setRedirect(true); 
        } else if (response.status == 401) {
            if (data['status'] == "username not found") {
                setUsernameExists(false); 
            } else if (data['status'] == "incorrect password") {
                setCorrectPassword(false); 
            }
        }
    };

    return (
        <div>
            {redirect && (<Navigate to="/" replace={true} />)}
            <Header 
                title="Log In" 
                subtitle="Need an account?" 
                linkText="Register here" 
                linkTo="/register" 
            />
            <Container>
                <Row>
                    <Container className="inner-width">
                        <Row>
                            <Form>
                                {!usernameExists && <div><br/><h3 className="text-danger large-text">Username not found.</h3></div>}
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" onChange={onUsernameChange} />
                                </Form.Group>

                                {!correctPassword && <div><br/><h3 className="text-danger large-text">Incorrect password.</h3></div>}
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>
                                <Button onClick={loginClick}variant="primary">
                                    Login
                                </Button>
                            </Form>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default Login;