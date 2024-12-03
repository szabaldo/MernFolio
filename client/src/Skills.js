import React, { useState, useEffect, useContext, createElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import Modal from './Modal';
import { IntroContext } from './App.js';
import Skill from './Skill.js';

function Skills() {
    const isIntro = useContext(IntroContext);
    const duration = 150;
    const defaultPortraitState = {
        portraitInfo: null,
        portraitRadius: 196,
        iconWidth: 128,
        portraitContainerHeight: 512,
        closing: false,
    }
    const [skillsState, setSkillsState] = useState(defaultPortraitState);
    // const portraitCircleSmall = `circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`;
    // const portraitCircleLarge = `circle(${defaultPortraitState.portraitContainerHeight / 2}px at ${defaultPortraitState.portraitContainerHeight / 2}px center)`; 
    const portraitCircleSmall = `circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`;
    const portraitCircleLarge = `circle(${defaultPortraitState.portraitContainerHeight / 2}px at ${defaultPortraitState.portraitContainerHeight / 2}px center)`; 
    const defaultBgColor = "#606060";

    useEffect(() => {
        if (isIntro) {
            // intro animations here
        }
    });


    const onClose = () => {
        document.getElementById("portraitContainer").animate(
            {
                opacity: [0],
            },
            {
                duration: duration,
                easeing: "ease",
                fill: "forwards"
            }
        );

        setTimeout(() => {
            setSkillsState({ ...defaultPortraitState, portraitRadius: defaultPortraitState.portraitRadius, portraitContainerHeight: defaultPortraitState.portraitContainerHeight, closing: true });
        }, duration);
    }

    const onSkillClick = (skill) => {
        if (skill != skillsState.portraitInfo) {
            const elements = [
                document.getElementById("portraitContainer"),
                document.getElementById("portrait")
            ]
            for (const [i, element] of elements.entries()) {
                element?.animate(
                    {
                        width: [`${defaultPortraitState.portraitContainerHeight}px`],
                        height: [`${defaultPortraitState.portraitContainerHeight}px`]
                    },
                    {
                        duration: duration,
                        easing: "ease",
                        fill: "forwards"
                    }
                );
            }

            if (skill != skillsState.portraitInfo) {
                document.getElementById("portraitContainer").animate(
                    {
                        opacity: [0],
                        shapeOutside: [portraitCircleLarge],
                        clipPath: [portraitCircleLarge]
                    },
                    {
                        duration: duration,
                        easeing: "ease",
                        fill: "forwards"
                    }
                );
            }

            setTimeout(() => {
                setSkillsState({ 
                    ...skillsState, 
                    portraitInfo: skill, 
                    portraitRadius: defaultPortraitState.portraitContainerHeight, 
                    iconWidth: 64, 
                })
            }, duration);
        }
    }

    useEffect(() => {
        document.getElementById("portraitContainer").animate(
            {
                opacity: [1]
            },
            {
                duration: duration,
                easeing: "ease",
                fill: "forwards"
            }
        );
        if (skillsState.portraitInfo == null) {
            document.getElementById("portraitContainer").animate(
                {
                    width: [`${defaultPortraitState.portraitRadius}px`],
                    height: [`${defaultPortraitState.portraitRadius}px`],
                    shapeOutside: [`circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`],
                    clipPath: [`circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`]
                },
                {
                    duration: duration,
                    easeing: "ease",
                    fill: "forwards"
                }
            )
            document.getElementById("portrait").animate(
                {
                    width: [`${defaultPortraitState.portraitRadius}px`],
                    height: [`${defaultPortraitState.portraitRadius}px`],
                },
                {
                    duration: duration,
                    easeing: "ease",
                    fill: "forwards"
                }
            )
        }
    }, [skillsState.portraitInfo]);

    return (
        <Container className="" style={{ textAlign: "left" }}>
            <div id="portraitContainer" style={{
                borderRadius: "50%",
                minWidth: `${defaultPortraitState.portraitContainerHeight}px`,
                minHeight: `${defaultPortraitState.portraitContainerHeight}px`,
                width: skillsState.portraitContainerHeight,
                height: skillsState.portraitContainerHeight,
                float: "left",
                shapeOutside: portraitCircleSmall,
                clipPath: portraitCircleSmall,
            }}>
                {
                    (skillsState.portraitInfo == null) ? (
                        <img id="portrait" src="portrait.jpg" className="" style={{
                            minWidth: `${defaultPortraitState.portraitRadius}px`,
                            minHeight: `${defaultPortraitState.portraitRadius}px`,
                            width: (skillsState.closing == true) ? defaultPortraitState.portraitContainerHeight : skillsState.portraitRadius,
                            height: (skillsState.closing == true) ? defaultPortraitState.portraitContainerHeight : skillsState.portraitRadius,
                        }} />
                    ) : (
                        <div style={{
                            width: defaultPortraitState.portraitContainerHeight,
                            height: defaultPortraitState.portraitContainerHeight,
                            display: "flex",
                            backgroundColor: (skills[skillsState.portraitInfo].color != null) ? skills[skillsState.portraitInfo].color : defaultBgColor,
                        }}>
                            <div style={{
                                width: Math.sqrt((defaultPortraitState.portraitContainerHeight * defaultPortraitState.portraitContainerHeight) / 2),
                                height: Math.sqrt((defaultPortraitState.portraitContainerHeight * defaultPortraitState.portraitContainerHeight) / 2),
                                margin: "auto",
                                textAlign: "left",
                            }}>
                                <img src="x.png" className="cursor-pointer hover-grow" style={{ width: 30 }} onClick={onClose}></img>
                                <Container>
                                    <Row className="py-1">
                                        <h2 className="large-text d-flex justify-content-center">{skills[skillsState.portraitInfo].title}</h2>
                                        <br />
                                        <p className="medium-text d-flex justify-content-center">{skills[skillsState.portraitInfo].description}</p>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    )
                }
            </div>
                {
                    Object.keys(skills).map((skill) => {
                        return (
                            <Skill skill={skill} onClick={onSkillClick} iconWidth={skillsState.iconWidth}></Skill>
                        )
                    })
                }
        </Container >
    );
}

export default Skills;