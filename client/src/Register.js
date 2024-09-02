import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.js';

function Register() {

    const registerClick = async () => {
        const body = {
            fname: document.getElementById("fnameControl").value, 
            lname: document.getElementById("lnameControl").value,
            username: document.getElementById("usernameControl").value,
            password: document.getElementById("passwordControl").value,
        };

        const response = await fetch("http://localhost:8080/register", {
            body: JSON.stringify({
                fname: document.getElementById("fnameControl").value, 
                lname: document.getElementById("lnameControl").value,
                username: document.getElementById("usernameControl").value,
                password: document.getElementById("passwordControl").value,
            }), 
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
        console.log(response);
    };

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
                                    <Form.Control type="text" placeholder="Enter first name" id="fnameControl" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formLName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" id="lnameControl" />
                                </Form.Group>

                                <br /><br />

                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" id="usernameControl" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" id="passwordControl" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>

                                <Button onClick={registerClick} variant="primary">
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