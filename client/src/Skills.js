import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import { IntroContext } from './App.js';
import Skill from './Skill.js';
import { Carousel, CarouselItem } from './Carousel.js';
import * as Anim from './styles/animations.js';
import * as SkillInfo from './SkillInfo.js';

function Skills({ headerState, setHeaderState }) {
    const skillsRef = useRef({
        isPortrait: (window.innerWidth < window.innerHeight),
        selectedSkill: null,
    })
    const isIntro = useContext(IntroContext);
    const [skillsState, setSkillsState] = useState({ isPortrait: skillsRef.current.isPortrait });
    const skillsElements = Object.values(skills).map((skill) => {
        return (
            <Skill skill={skill.id} onClick={() => {
                if (skillsState.selectedSkill == null) {
                    document.getElementById("portrait").animate(Anim.portraitSlideLeft, Anim.portraitSlideLeftOptions);
                    const fadeOutElements = [
                        ...document.getElementsByClassName("main-skill"),
                        document.getElementById("allSkillsRow"),
                    ]
                    for (const element of fadeOutElements) {
                        element.animate(Anim.fadeOut, Anim.fadeOutOptions);
                    }
                }
                setTimeout(() => {
                    const selectedSkill = skill.id;
                    const portraitSlot = `skills/${skill.id}.png`;
                    setSkillsState({
                        ...skillsState,
                        portraitSlot: portraitSlot,
                        selectedSkill: selectedSkill,
                        mainSkillSlideFlag: (skillsState.selectedSkill == null),
                    });
                    skillsRef.current.selectedSkill = selectedSkill;
                    skillsRef.current.portraitSlot = portraitSlot;
                    setHeaderState({ ...headerState, title: skill.title })
                }, (skillsState.selectedSkill == null) ? Anim.fadeInOptions.duration : 0);
            }} iconWidth={64} />
        )
    });

    useEffect(() => {
        document.getElementById("portrait").src = (skillsState.portraitSlot == null) ? "portrait.jpg" : `skills/${skillsState.portraitSlot}.png`;
        if (isIntro.current) {
            const fadeInElements = [
                document.getElementById("allSkillsRow")
            ];
            for (let element of fadeInElements) {
                element.animate(Anim.fadeIn, Anim.fadeInOptions)
            };
        }
        window.addEventListener("resize", () => {
            if ((window.innerWidth < window.innerHeight) != skillsRef.current.isPortrait) {
                skillsRef.current.isPortrait = (window.innerWidth < window.innerHeight);
                setSkillsState({ ...skillsState, selectedSkill: skillsRef.current.selectedSkill, isPortrait: skillsRef.current.isPortrait });
            }
        }, false);
    }, []);

    const skillToInfo = (skill) => {
        let info;
        switch (skill) {
            case "node":
                info = SkillInfo.NodeInfo;
                break;
            case "bootstrap":
                info = SkillInfo.BootstrapInfo;
                break;
            case "docker":
                info = SkillInfo.DockerInfo;
                break;
            case "ec2":
                info = SkillInfo.Ec2Info;
                break;
            case "mysql":
                info = SkillInfo.MysqlInfo;
                break;
            case "react":
                info = SkillInfo.ReactInfo;
                break;
            case "javascript":
                info = SkillInfo.JavascriptInfo;
                break;
            case "csharp":
                info = SkillInfo.CsharpInfo;
                break;
            case "hii":
                info = SkillInfo.HiiInfo;
                break;
            case "ud":
                info = SkillInfo.UdInfo;
                break;
            case "python":
                info = SkillInfo.PythonInfo;
                break;
            case "java":
                info = SkillInfo.JavaInfo;
                break;
            case "rust":
                info = SkillInfo.RustInfo;
                break;
            case "installshield":
                info = SkillInfo.InstallshieldInfo;
                break;
            case "langchain":
                info = SkillInfo.LangchainInfo;
                break;
            case "vb6":
                info = SkillInfo.Vb6Info;
                break;
            case "leader":
                info = SkillInfo.LeaderInfo;
                break;
            case "cycle":
                info = SkillInfo.CycleInfo;
                break;
            case "learning":
                info = SkillInfo.LearningInfo;
                break;
            case "customer":
                info = SkillInfo.CustomerInfo;
                break;
            case "portfolio":
                info = SkillInfo.PortfolioInfo;
                break;
            default:
                info = SkillInfo.BrokenInfo;
        }
        return info;
    }

    const skillToRelatedSkills = (skill) => {
        let relatedSkills;
        switch (skill) {
            case "node":
                relatedSkills = SkillInfo.NodeSkills;
                break;
            case "bootstrap":
                relatedSkills = SkillInfo.BootstrapSkills;
                break;
            case "docker":
                relatedSkills = SkillInfo.DockerSkills;
                break;
            case "ec2":
                relatedSkills = SkillInfo.Ec2Skills;
                break;
            case "mysql":
                relatedSkills = SkillInfo.MysqlSkills;
                break;
            case "react":
                relatedSkills = SkillInfo.ReactSkills;
                break;
            case "javascript":
                relatedSkills = SkillInfo.JavascriptSkills;
                break;
            case "csharp":
                relatedSkills = SkillInfo.CsharpSkills;
                break;
            case "hii":
                relatedSkills = SkillInfo.HiiSkills;
                break;
            case "ud":
                relatedSkills = SkillInfo.UdSkills;
                break;
            case "python":
                relatedSkills = SkillInfo.PythonSkills;
                break;
            case "java":
                relatedSkills = SkillInfo.JavaSkills;
                break;
            case "rust":
                relatedSkills = SkillInfo.RustSkills;
                break;
            case "installshield":
                relatedSkills = SkillInfo.InstallshieldSkills;
                break;
            case "langchain":
                relatedSkills = SkillInfo.LangchainSkills;
                break;
            case "vb6":
                relatedSkills = SkillInfo.Vb6Skills;
                break;
            case "leader":
                relatedSkills = SkillInfo.LeaderSkills;
                break;
            case "cycle":
                relatedSkills = SkillInfo.CycleSkills;
                break;
            case "learning":
                relatedSkills = SkillInfo.LearningSkills;
                break;
            case "customer":
                relatedSkills = SkillInfo.CustomerSkills;
                break;
            case "portfolio":
                relatedSkills = SkillInfo.PortfolioSkills;
                break;
            default:
                relatedSkills = SkillInfo.NodeSkills;
        }
        return relatedSkills;
    }

    return (
        <Container>
            {
                (skillsRef.current.selectedSkill == null)
                    ? <SkillsDefault
                        headerState={headerState}
                        setHeaderState={setHeaderState}
                        skillsState={skillsState}
                        setSkillsState={setSkillsState}
                        skillsRef={skillsRef}
                    />
                    : <SkillsInfo
                        info={skillToInfo(skillsRef.current.selectedSkill)}
                        relatedSkills={skillToRelatedSkills(skillsRef.current.selectedSkill)}
                        headerState={headerState}
                        setHeaderState={setHeaderState}
                        skillsState={skillsState}
                        setSkillsState={setSkillsState}
                        skillsRef={skillsRef}
                    />
            }
            <Row id="allSkillsRow" className="py-3" style={{ marginTop: 25 }}>
                <div className="d-flex align-items-center" style={{ overflowX: "auto" }}>
                    {skillsElements}
                </div>
            </Row>
        </Container>
    );
}

function SkillsDefault({ headerState, setHeaderState, skillsState, setSkillsState, skillsRef }) {
    const isIntro = useContext(IntroContext);
    useEffect(() => {
        if (isIntro.current) {
            const fadeInElements = [
                document.getElementById("portrait"),
                ...document.getElementsByClassName("main-skill"),
                document.getElementById("allSkillsRow")
            ];
            for (let element of fadeInElements) {
                element.animate(Anim.fadeIn, Anim.fadeInOptions)
            };
        }
    });

    return (
        <>
            <Row className="py-3">
                <Col className="main-skill text-end m-auto">
                    <Skill onClick={() => {
                        document.getElementById("portrait").animate(Anim.portraitSlideLeft, Anim.portraitSlideLeftOptions);
                        const fadeOutElements = [
                            ...document.getElementsByClassName("main-skill"),
                            document.getElementById("allSkillsRow"),
                        ]
                        for (const element of fadeOutElements) {
                            element.animate(Anim.fadeOut, Anim.fadeOutOptions);
                        }
                        setTimeout(() => {
                            const selectedSkill = "hii";
                            const portraitSlot = "skills/hii.png";
                            setSkillsState({
                                ...skillsState,
                                portraitSlot: portraitSlot,
                                selectedSkill: selectedSkill,
                                mainSkillSlideFlag: (skillsRef.current.selectedSkill == null),
                            });
                            skillsRef.current.selectedSkill = selectedSkill;
                            skillsRef.current.portraitSlot = portraitSlot;
                            setHeaderState({ ...headerState, title: skills.hii.title })
                        }, Anim.fadeInOptions.duration);
                    }} skill="hii" iconWidth={128} />
                </Col>
                <Col className="text-center m-auto">
                    <img id="portrait" src={skillsRef.current.portraitSlot} style={{
                        maxWidth: 256,
                        maxHeight: 256,
                        borderRadius: "50%",
                    }} />
                </Col>
                <Col className="main-skill text-start m-auto">
                    <Skill onClick={() => {
                        document.getElementById("portrait").animate(Anim.portraitSlideLeft, Anim.portraitSlideLeftOptions);
                        const fadeOutElements = [
                            ...document.getElementsByClassName("main-skill"),
                            document.getElementById("allSkillsRow"),
                        ]
                        for (const element of fadeOutElements) {
                            element.animate(Anim.fadeOut, Anim.fadeOutOptions);
                        }
                        setTimeout(() => {
                            const selectedSkill = "ud";
                            const portraitSlot = "skills/ud.png";
                            setSkillsState({
                                ...skillsState,
                                portraitSlot: portraitSlot,
                                selectedSkill: selectedSkill,
                                mainSkillSlideFlag: (skillsRef.current.selectedSkill == null),
                            });
                            skillsRef.current.selectedSkill = selectedSkill;
                            skillsRef.current.portraitSlot = portraitSlot;
                            setHeaderState({ ...headerState, title: skills.ud.title })
                        }, Anim.fadeInOptions.duration);
                    }} skill="ud" iconWidth={128} />
                </Col>
            </Row>
        </>
    );
}

function SkillsInfo({ info, relatedSkills, headerState, setHeaderState, skillsState, setSkillsState, skillsRef }) {
    const relatedSkillsElements = Object.values(relatedSkills).map((skill) => {
        return (
            <Skill skill={skill.id} onClick={() => {
                if (skillsRef.current.selectedSkill == null) {
                    document.getElementById("portrait").animate(Anim.portraitSlideLeft, Anim.portraitSlideLeftOptions);
                    const fadeOutElements = [
                        ...document.getElementsByClassName("main-skill"),
                        document.getElementById("allSkillsRow"),
                    ]
                    for (const element of fadeOutElements) {
                        element.animate(Anim.fadeOut, Anim.fadeOutOptions);
                    }
                }
                setTimeout(() => {
                    const selectedSkill = skill.id;
                    const portraitSlot = `skills/${skill.id}.png`;
                    setSkillsState({
                        ...skillsState,
                        portraitSlot: portraitSlot,
                        selectedSkill: selectedSkill,
                        mainSkillSlideFlag: (skillsRef.current.selectedSkill == null),
                    });
                    skillsRef.current.selectedSkill = selectedSkill; 
                    skillsRef.current.portraitSlot = portraitSlot;
                    setHeaderState({ ...headerState, title: skill.title })
                }, (skillsRef.current.selectedSkill == null) ? Anim.fadeInOptions.duration : 0);
            }} iconWidth={64} />
        )
    });

    useEffect(() => {
        if (skillsState.mainSkillSlideFlag == true) {
            const appearLeftElements = [
                document.getElementById("portrait")
            ];
            for (let element of appearLeftElements) {
                element.animate(Anim.portraitAppearLeft, Anim.portraitAppearLeftOptions)
            };
            const fadeInElements = [
                ...document.getElementsByClassName("related-skills"),
                document.getElementById("allSkillsRow")
            ];
            for (let element of fadeInElements) {
                element.animate(Anim.fadeIn, Anim.fadeInOptions)
            };
        } else {
            const fadeInElements = [
                document.getElementById("portrait"),
                ...document.getElementsByClassName("related-skills")
            ];
            for (let element of fadeInElements) {
                element.animate(Anim.fadeIn, Anim.fadeInOptions)
            };
        }
        setSkillsState({ ...skillsState, mainSkillSlideFlag: false });
    }, [skillsState.selectedSkill]);

    const maxHeight = skillsState.isPortrait ? 256 : 512;
    const skillIconWidth = 256;
    const infoInnerWidth = skillIconWidth * 3 / 4;
    return (
        <>
            <Row className="mb-3 py-3 justify-content-between">
                <Col id="portraitContainer" style={{
                    maxHeight: maxHeight,
                    maxWidth: skillsState.isPortrait ? skillIconWidth : "fit-content",
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowX: "hidden",
                }}>
                    <img id="portrait" src={skillsRef.current.portraitSlot} style={skillsRef.current.isPortrait ? {
                        width: skillIconWidth,
                        height: skillIconWidth,
                        overflow: "hidden",
                        borderRadius: "10%",
                        position: "relative",
                        zIndex: 5,
                    } : {
                        maxWidth: skillIconWidth,
                        maxHeight: skillIconWidth,
                        overflow: "hidden",
                        float: "left",
                        borderRadius: "10%",
                        marginLeft: 25,
                        marginRight: 25,
                    }} />
                    {skillsRef.current.isPortrait ? <></> : info}
                </Col>
                <Col className="d-flex flex-column" style={{
                    maxHeight: maxHeight,
                    maxWidth: skillsRef.current.isPortrait ? "none" : `${infoInnerWidth}px`
                }}>
                    <h3 className="large-text text-center">Related Skills</h3>
                    <div className="related-skills d-flex flex-wrap" style={{
                        justifyContent: "center",
                        overflowX: "hidden",
                        overflowY: "auto",
                        maxHeight: `${maxHeight - 28 - 8}px`,
                    }}>
                        {relatedSkillsElements}
                    </div>
                </Col>
            </Row>
            {skillsState.isPortrait ? (
                <Row className="py-5" style={{}}>
                    {info}
                </Row>
            ) : <></>
            }
        </>
    );
}

export default Skills;