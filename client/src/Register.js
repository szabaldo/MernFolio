import React from 'react';
import { useState } from 'react'; 
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Header from './Header.js';

function Register() {
    const [passwordsMatch, setPasswordsMatch] = useState(true); 
    const [redirect, setRedirect] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);

    const onUsernameChange = () => {
        setUsernameExists(false); 
    };

    const registerClick = async () => {
        const body = {
            fname: document.getElementById("formFname").value, 
            lname: document.getElementById("formLname").value,
            username: document.getElementById("formUsername").value,
            password: document.getElementById("formPassword").value,
            passwordConfirm: document.getElementById("formConfirmPassword").value
        };
        const pm = body.password == body.passwordConfirm;
        setPasswordsMatch(pm); 
        if (pm) {
            const response = await fetch("http://localhost:8080/register", {
                body: JSON.stringify(body), 
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });
            console.log(await response.text());
            if (response.status == 201) {
                setRedirect(true); 
            } else if (response.status == 204) {
                setUsernameExists(true); 
            }
        }
    };

    return (
        <div>
            {redirect && (<Navigate to="/login" repalce={true} />)}
            <Header 
                title="Register"
            />
            <Container>
                <Row>
                    <Container className="mw-50">
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="formFname">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formLname">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" />
                                </Form.Group>

                                <br/><br/>

                                {usernameExists && <div><br/><h3 className="text-danger large-text">This username already exists, please choose another.</h3></div>}
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" className={usernameExists && "border-alert"} onChange={onUsernameChange} />
                                </Form.Group>

                                {!passwordsMatch && <div><br/><h3 className="text-danger large-text">Your passwords don't match!</h3></div>}
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" className={!passwordsMatch && "border-alert"} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" className={!passwordsMatch && "border-alert"} />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>

                                <Button onClick={registerClick} variant="primary">
                                    Register
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