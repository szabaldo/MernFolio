import React from 'react';
import { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Header from './Header.js';

function Register() {
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        fname: "",
        lname: "",
        confirmPassword: "",
    });
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fname: "",
        lname: "",
        confirmPassword: "",
    });
    const [redirect, setRedirect] = useState(false);

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

        if (!data.fname.trim()) {
            errors.fname = 'Enter a first name';
        } else if (data.fname.length > 20) {
            errors.fname = 'First name must be between 1 and 20 characters';
        } else {
            delete errors.fname;
        }

        if (!data.lname.trim()) {
            errors.lname = 'Enter a last name';
        } else if (data.lname.length > 20) {
            errors.lname = 'Last name must be between 1 and 20 characters';
        } else {
            delete errors.lname;
        }

        if (!data.password) {
            errors.password = 'Enter a password';
        } else if (data.password.length > 20) {
            errors.password = 'Password must be between 1 and 20 characters';
        } else {
            delete errors.password;
        }

        if (data.password != data.confirmPassword) {
            errors.password = 'Passwords do not match'; 
        } else {
            delete errors.confirmPassword; 
        }

        return errors;
    }

    const registerClick = async () => {
        const newErrors = validate(formData);
        setErrors(newErrors);

        if (Object.keys(errors).length === 0) {
                const response = await fetch(process.env.ORIGIN + "/register", {
                    body: JSON.stringify(formData),
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });
                console.log(await response.text());
                if (response.status == 201) {
                    setRedirect(true);
                } else if (response.status == 204) {
                    errors.username = 'This username already exists, please choose another.';
                    setErrors(errors); 
                }
        } else {
            console.error("Form validation errors:");
            console.error(newErrors);
        }
    };

    return (
        <div>
            {redirect && (<Navigate to="/login" replace={true} />)}
            <Header
                title="Register"
            />
            <Container>
                <Row>
                    <Container className="inner-width">
                        <Row>
                            <Form>
                                {errors.fname && <div><br /><h3 className="text-danger large-text">{errors.fname}</h3></div>}
                                <Form.Group className="mb-3" controlId="formFname">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" className={errors.fname && "border-alert"} onChange={handleChange} name="fname" value={formData.fname} />
                                </Form.Group>

                                {errors.lname && <div><br /><h3 className="text-danger large-text">{errors.lname}</h3></div>}
                                <Form.Group className="mb-3" controlId="formLname">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" className={errors.lname && "border-alert"} onChange={handleChange} name="lname" value={formData.lname} />
                                </Form.Group>

                                <br /><br />

                                {errors.username && <div><br /><h3 className="text-danger large-text">{errors.username}</h3></div>}
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" className={errors.username && "border-alert"} onChange={handleChange} name="username" value={formData.username} />
                                </Form.Group>

                                {errors.password && <div><br /><h3 className="text-danger large-text">{errors.password}</h3></div>}
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" className={errors.password && "border-alert"} onChange={handleChange} name="password" value={formData.password} />
                                </Form.Group>

                                {errors.confirmPassword && <div><br /><h3 className="text-danger large-text">{errors.confirmPassword}</h3></div>}
                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" className={errors.password && "border-alert"} onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} />
                                    <Form.Text className="text-danger">
                                        This site is not secure! DO NOT use a real password.
                                    </Form.Text>
                                </Form.Group>

                                <Button onClick={registerClick} variant="primary" disabled={Object.keys(errors).length > 0}>
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