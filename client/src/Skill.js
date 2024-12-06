import React, { useState, useEffect, useContext, createElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import Modal from './Modal';
import { IntroContext } from './App.js';

function Skill({ skill, onClick, iconWidth }) {
    const isIntro = useContext(IntroContext);

    useEffect(() => { // TODO turn this animation useEffect into a custom hook
        if (isIntro.current) {

        }
    }, [isIntro]);

    return (
        <>
            <div name="skill" className="p-2 d-inline-flex flex-column align-items-center w-fit-content h-fit-content position-relative" style={{ zIndex: 1 }} >
                <img
                    onClick={() => { onClick(skill) }}
                    key={skill}
                    src={`skills/${skills[skill].id}.png`}
                    style={{ width: iconWidth, height: iconWidth, borderRadius: "25%" }}
                    className="hover-grow"
                />
                <h3 className="large-text px-2 text-center" style={{ direction: "ltr" }}>{skills[skill].title}</h3>
            </div>
        </>
    );
}

export default Skill;