import React, { useEffect, useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { IntroContext } from './App.js';

function Header({ title, subtitle, linkText, linkTo }) {
    // const isIntro = useOutletContext();
    const isIntro = useContext(IntroContext); 

    useEffect(() => { // TODO turn this animation useEffect into a custom hook
        if (isIntro.current) {
            let elements = [];
            elements.push(document.getElementById("header"));
            elements.push(document.getElementById("subtitle"));
            for (const element of elements) {
                element.animate({
                    transform: ["translateY(250px)", "translate(0px)"],
                    opacity: [0, 1]
                }, {
                    duration: Math.ceil(Math.random() * 1000),
                    easing: "ease",
                });
            }
        }
    });

    return (
        <div>
            <Container className="min-width">
                <Row className="pb-5">
                    <Col className="min-width-48">
                        <h1 className="xxl-text" id="header">{title}</h1>
                    </Col>
                    <Col>
                        <Container className="text-center" id="subtitle">
                            <Row>
                                <Col ></Col>
                                <Col md="auto" className="">
                                    <h3 className="large-text d-flex justify-content-center">{subtitle}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
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