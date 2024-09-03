import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.js'; 

function Login() {

    const loginClick = async () => {
        const body = {
            username: document.getElementById("usernameControl").value,
            password: document.getElementById("passwordControl").value,
        };

        const response = await fetch("http://localhost:8080/login", {
            body: JSON.stringify(body), 
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
        console.log(response);
    };

    return (
        <div>
            <Header 
                title="Log In" 
                subtitle="Need an account?" 
                linkText="Register here" 
                linkTo="/register" 
            />
            <Container>
                <Row>
                    <Container className="mw-50">
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" id="usernameControl" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" id="passwordControl" />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>
                                <Button onClick={loginClick}variant="primary">
                                    Submit
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