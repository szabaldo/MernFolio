import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.js';

function Register() {

    let state = {
        fname:"", 
        lname: "",
        username: "", 
        password: "",
    }

    const registerClick = () => {
    }

    return (
        <div>
            <Header 
                title="Register"
            />
            <Container>
                <Row>
                    <Container className="mw-50">
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="formFName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" value={state.fname}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formLName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" value={state.lname}/>
                                </Form.Group>

                                <br /><br />

                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" value={state.username}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={state.password}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>

                                <Button onClick="" variant="primary" type="submit">
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

export default Register;