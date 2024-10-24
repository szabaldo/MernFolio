import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate, useOutletContext } from 'react-router-dom';
import Header from './Header.js';
import { UserContext } from './App.js';

function Login() {
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [redirect, setRedirect] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const isIntro = useOutletContext(); 

    const loginClick = async () => {
        const newErrors = validate(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const response = await fetch(process.env.ORIGIN + "/login", {
                body: JSON.stringify(formData),
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const data = await response.json();
            console.log(data);
            if (response.status == 200) {
                setUser(data.user);
                setRedirect(true);
            } else if (response.status == 401) {
                if (data['status'] == "username not found") {
                    errors.username = 'Username not found';
                    setErrors(errors); 
                } else if (data['status'] == "incorrect password") {
                    errors.password = 'Incorrect password';
                    setErrors(errors); 
                }
            }
        } else {
            console.error("Form validation errors:");
            console.error(newErrors);  
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        const data = formData; 
        data[name] = value; 
        setErrors(validate(data));
    };

    const validate = (data) => { // TODO: Validation should consider ASCII characters, etc. 
        const errors = {}; 

        if (!data.username.trim()) {
            errors.username = 'Enter a username';
        } else if (data.username.length > 20) {
            errors.username = 'Username must be between 1 and 20 characters'; 
        } else {
            delete errors.username;
        }

        if (!data.password) {
            errors.password = 'Enter a password';
        } else if (data.password.length > 20) {
            errors.password = 'Password must be between 1 and 20 characters'; 
        } else {
            delete errors.password;
        }

        return errors;
    }

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
                                {errors.username && <div><br /><h3 className="text-danger large-text">{errors.username}</h3></div>}
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" onChange={handleChange} value={formData.username} name="username" />
                                </Form.Group>

                                {errors.password && <div><br /><h3 className="text-danger large-text">{errors.password}</h3></div>}
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password" />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Button onClick={loginClick} variant="primary"  disabled={Object.keys(errors).length > 0}>
                                        Login
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default Login;