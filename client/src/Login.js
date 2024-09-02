import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.js'; 

function Login() {
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
                                    <Form.Control type="text" placeholder="Enter username" />
                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">
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