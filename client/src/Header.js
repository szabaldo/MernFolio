import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Header({title, subtitle, linkText, linkTo}) {
    return (
        <div>
            <Container className="min-width">
                <Row className="pb-5">
                    <Col className="min-width-48">
                        <h1 className="xxl-text">{title}</h1>
                    </Col>
                    <Col>
                        <Container className="text-center">
                            <Row>
                                <Col ></Col>
                                <Col md="auto" className="">
                                    <h3 className="large-text d-flex justify-content-center">{subtitle}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col ></Col>
                                <Col>
                                    <Link
                                        className="medium-text d-flex justify-content-center"
                                        to={linkTo}
                                    >
                                        {linkText}
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;