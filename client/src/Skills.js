import React, { useState, useEffect, useContext, createElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import Modal from './Modal';
import { IntroContext } from './App.js';
import Skill from './Skill.js';
import { Carousel, CarouselItem } from './Carousel.js';
import * as Anim from './styles/animations.js';
import * as SkillInfo from './SkillInfo.js';

function Skills({ headerState, setHeaderState }) {
    const isIntro = useContext(IntroContext);
    const [skillsState, setSkillsState] = useState({
        portraitSlot: "portrait.jpg",
        selectedSkill: null
    });
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
                    setSkillsState({
                        ...skillsState,
                        portraitSlot: `skills/${skill.id}.png`,
                        selectedSkill: skill.id,
                        mainSkillSlideFlag: (skillsState.selectedSkill == null),
                    });
                    setHeaderState({ ...headerState, title: skill.title })
                }, (skillsState.selectedSkill == null) ? Anim.fadeInOptions.duration : 0);
            }} iconWidth={64} />
        )
    });

    useEffect(() => {
        document.getElementById("portrait").src = skillsState.portraitSlot;
        if (isIntro.current) {
            const fadeInElements = [
                document.getElementById("allSkillsRow")
            ];
            for (let element of fadeInElements) {
                element.animate(Anim.fadeIn, Anim.fadeInOptions)
            };
        }
    });

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
                info = SkillInfo.NodeInfo;
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
                (skillsState.selectedSkill == null)
                    ? <SkillsDefault
                        headerState={headerState}
                        setHeaderState={setHeaderState}
                        skillsState={skillsState}
                        setSkillsState={setSkillsState}
                    />
                    : <SkillsInfo
                        info={skillToInfo(skillsState.selectedSkill)}
                        relatedSkills={skillToRelatedSkills(skillsState.selectedSkill)}
                        headerState={headerState}
                        setHeaderState={setHeaderState}
                        skillsState={skillsState}
                        setSkillsState={setSkillsState}
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

function SkillsDefault({ headerState, setHeaderState, skillsState, setSkillsState }) {
    useEffect(() => {
        const fadeInElements = [
            document.getElementById("portrait"),
            ...document.getElementsByClassName("main-skill"),
            document.getElementById("allSkillsRow")
        ];
        for (let element of fadeInElements) {
            element.animate(Anim.fadeIn, Anim.fadeInOptions)
        };
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
                            setSkillsState({
                                ...skillsState,
                                portraitSlot: "skills/hii.png",
                                selectedSkill: "hii",
                                mainSkillSlideFlag: (skillsState.selectedSkill == null),
                            });
                            setHeaderState({ ...headerState, title: skills.hii.title })
                        }, Anim.fadeInOptions.duration);
                    }} skill="hii" iconWidth={128} />
                </Col>
                <Col className="text-center m-auto">
                    <img id="portrait" src={skillsState.portraitSlot} style={{
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
                            setSkillsState({
                                ...skillsState,
                                portraitSlot: "skills/ud.png",
                                selectedSkill: "ud",
                                mainSkillSlideFlag: (skillsState.selectedSkill == null),
                            });
                            setHeaderState({ ...headerState, title: skills.ud.title })
                        }, Anim.fadeInOptions.duration);
                    }} skill="ud" iconWidth={128} />
                </Col>
            </Row>
        </>
    );
}

function SkillsInfo({ info, relatedSkills, headerState, setHeaderState, skillsState, setSkillsState }) {
    const relatedSkillsElements = Object.values(relatedSkills).map((skill) => {
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
                    setSkillsState({
                        ...skillsState,
                        portraitSlot: `skills/${skill.id}.png`,
                        selectedSkill: skill.id,
                        mainSkillSlideFlag: (skillsState.selectedSkill == null),
                    });
                    setHeaderState({ ...headerState, title: skill.title })
                }, (skillsState.selectedSkill == null) ? Anim.fadeInOptions.duration : 0);
            }} iconWidth={64} />
        )
    });

    useEffect(() => {
        if (skillsState.mainSkillSlideFlag == true) {
            document.getElementById("portrait").animate(Anim.portraitAppearLeft, Anim.portraitAppearLeftOptions);
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

    // const infoPortion = 75;
    const maxHeight = 512;
    const skillIconWidth = 256;
    return (
        <>
            <Row className="py-3 justify-content-between">
                <Col id="portraitContainer" style={{
                    // maxWidth: `${infoPortion}%`,
                    maxHeight: maxHeight,
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflowY: "auto",
                }}>
                    <img id="portrait" src={skillsState.portraitSlot} style={{
                        maxWidth: skillIconWidth,
                        maxHeight: skillIconWidth,
                        float: "left",
                        borderRadius: "25%",
                        marginLeft: 25,
                        marginRight: 25,
                    }} />
                    {info}
                </Col>
                <Col md="auto" style={{
                    maxHeight: maxHeight,
                }}>
                    <h3 className="large-text">Related Skills</h3>
                    <div className="related-skills d-flex flex-wrap" style={{
                        justifyContent: "center",
                        overflowX: "hidden",
                        overflowY: "auto",
                        maxHeight: `${maxHeight - 28 - 8}px`,
                        maxWidth: `${192}px`
                    }}>
                        {relatedSkillsElements}
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Skills;



// import React, { useState, useEffect, useContext, createElement } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import skills from './skills.json' with {type: 'json'};
// import Modal from './Modal';
// import { IntroContext } from './App.js';
// import Skill from './Skill.js';
// import SkillInfo from './SkillInfo.js';

// function Skills() {
//     const isIntro = useContext(IntroContext);
//     const duration = 150;
//     const defaultPortraitState = {
//         portraitInfo: null,
//         portraitRadius: 196,
//         iconWidth: 128,
//         portraitContainerHeight: 512,
//         closing: false,
//     }
//     const [skillsState, setSkillsState] = useState(defaultPortraitState);
//     // const portraitCircleSmall = `circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`;
//     // const portraitCircleLarge = `circle(${defaultPortraitState.portraitContainerHeight / 2}px at ${defaultPortraitState.portraitContainerHeight / 2}px center)`;
//     const portraitCircleSmall = `circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`;
//     const portraitCircleLarge = `circle(${defaultPortraitState.portraitContainerHeight / 2}px at ${defaultPortraitState.portraitContainerHeight / 2}px center)`;
//     const defaultBgColor = "#606060";

//     useEffect(() => {
//         if (isIntro) {
//             // intro animations here
//         }
//     });


//     const onClose = () => {
//         document.getElementById("portraitContainer").animate(
//             {
//                 opacity: [0],
//             },
//             {
//                 duration: duration,
//                 easeing: "ease",
//                 fill: "forwards"
//             }
//         );

//         setTimeout(() => {
//             setSkillsState({ ...defaultPortraitState, portraitRadius: defaultPortraitState.portraitRadius, portraitContainerHeight: defaultPortraitState.portraitContainerHeight, closing: true });
//         }, duration);
//     }

//     const onSkillClick = (skill) => {
//         if (skill != skillsState.portraitInfo) {
//             const elements = [
//                 document.getElementById("portraitContainer"),
//                 document.getElementById("portrait")
//             ]
//             for (const [i, element] of elements.entries()) {
//                 element?.animate(
//                     {
//                         width: [`${defaultPortraitState.portraitContainerHeight}px`],
//                         height: [`${defaultPortraitState.portraitContainerHeight}px`]
//                     },
//                     {
//                         duration: duration,
//                         easing: "ease",
//                         fill: "forwards"
//                     }
//                 );
//             }

//             if (skill != skillsState.portraitInfo) {
//                 document.getElementById("portraitContainer").animate(
//                     {
//                         opacity: [0],
//                         shapeOutside: [portraitCircleLarge],
//                         clipPath: [portraitCircleLarge]
//                     },
//                     {
//                         duration: duration,
//                         easeing: "ease",
//                         fill: "forwards"
//                     }
//                 );
//             }

//             setTimeout(() => {
//                 setSkillsState({
//                     ...skillsState,
//                     portraitInfo: skill,
//                     portraitRadius: defaultPortraitState.portraitContainerHeight,
//                     iconWidth: 64,
//                 })
//             }, duration);
//         }
//     }

//     useEffect(() => {
//         document.getElementById("portraitContainer").animate(
//             {
//                 opacity: [1]
//             },
//             {
//                 duration: duration,
//                 easeing: "ease",
//                 fill: "forwards"
//             }
//         );
//         if (skillsState.portraitInfo == null) {
//             document.getElementById("portraitContainer").animate(
//                 {
//                     width: [`${defaultPortraitState.portraitRadius}px`],
//                     height: [`${defaultPortraitState.portraitRadius}px`],
//                     shapeOutside: [`circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`],
//                     clipPath: [`circle(${defaultPortraitState.portraitRadius / 2}px at ${defaultPortraitState.portraitRadius / 2}px ${skillsState.portraitRadius / 2}px)`]
//                 },
//                 {
//                     duration: duration,
//                     easeing: "ease",
//                     fill: "forwards"
//                 }
//             )
//             document.getElementById("portrait").animate(
//                 {
//                     width: [`${defaultPortraitState.portraitRadius}px`],
//                     height: [`${defaultPortraitState.portraitRadius}px`],
//                 },
//                 {
//                     duration: duration,
//                     easeing: "ease",
//                     fill: "forwards"
//                 }
//             )
//         }
//     }, [skillsState.portraitInfo]);

//     return (
//         <Container className="" style={{ textAlign: "left" }}>
//             <div id="portraitContainer" style={{
//                 borderRadius: "50%",
//                 minWidth: `${defaultPortraitState.portraitContainerHeight}px`,
//                 minHeight: `${defaultPortraitState.portraitContainerHeight}px`,
//                 width: skillsState.portraitContainerHeight,
//                 height: skillsState.portraitContainerHeight,
//                 float: "left",
//                 shapeOutside: portraitCircleSmall,
//                 clipPath: portraitCircleSmall,
//             }}>
//                 {
//                     (skillsState.portraitInfo == null) ? (
//                         <img id="portrait" src="portrait.jpg" className="" style={{
//                             minWidth: `${defaultPortraitState.portraitRadius}px`,
//                             minHeight: `${defaultPortraitState.portraitRadius}px`,
//                             width: (skillsState.closing == true) ? defaultPortraitState.portraitContainerHeight : skillsState.portraitRadius,
//                             height: (skillsState.closing == true) ? defaultPortraitState.portraitContainerHeight : skillsState.portraitRadius,
//                         }} />
//                     ) : (
//                         <div style={{
//                             width: defaultPortraitState.portraitContainerHeight,
//                             height: defaultPortraitState.portraitContainerHeight,
//                             display: "flex",
//                             backgroundColor: (skills[skillsState.portraitInfo].color != null) ? skills[skillsState.portraitInfo].color : defaultBgColor,
//                         }}>
//                             <div style={{
//                                 width: Math.sqrt((defaultPortraitState.portraitContainerHeight * defaultPortraitState.portraitContainerHeight) / 2),
//                                 height: Math.sqrt((defaultPortraitState.portraitContainerHeight * defaultPortraitState.portraitContainerHeight) / 2),
//                                 margin: "auto",
//                                 textAlign: "left",
//                             }}>
//                                 <img src="x.png" className="cursor-pointer hover-grow" style={{ width: 30 }} onClick={onClose}></img>
//                                 <SkillInfo skill={skillsState.portraitInfo} />
//                             </div>
//                         </div>
//                     )
//                 }
//             </div>
//             {
//                 Object.keys(skills).map((skill) => {
//                     if (skills[skill].isRoot === true) {
//                         return (
//                             <Skill skill={skill} onClick={onSkillClick} iconWidth={skillsState.iconWidth}></Skill>
//                         )
//                     }
//                 })
//             }
//         </Container >
//     );
// }

// export default Skills;