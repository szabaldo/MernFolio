import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import Skill from './Skill.js';

function SkillInfo({ skill }) {

    const node = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const bootstrap = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const docker = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const ec2 = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const mysql = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const react = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const javascript = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const csharp = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const hiiSkills = [
        skills['node'],
        skills['react'],
        skills['javascript'],
        skills['csharp'],
        skills['python'],
        skills['rust'],
        skills['installshield'],
        skills['langchain'],
        skills['vb6'],
        skills['leader'],
        skills['cycle'],
        skills['learning'],
        skills['customer']
    ]
    const hii = (
        <Container>
            {
                hiiSkills.map((hiiSkill) => {
                    return (
                        <Skill onClick={() => {}} skill={hiiSkill.id} iconWidth={64} />
                    )
                })
            }
        </Container>
    )

    const ud = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const python = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const java = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const rust = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const installshield = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const langchain = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const vb6 = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const leader = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const cycle = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const learningSkills = [
        skills['react'],
        skills['csharp'], 
        skills['python'],
        skills['rust'],
        skills['installshield'],
        skills['langchain'],
        skills['vb6'],
    ];
    const learning = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const customer = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    const portfolio = (
        <Container>
            <Row className="py-1">
                <h2 className="large-text d-flex justify-content-center">{skills[skill].title}</h2>
                <br />
                <p className="medium-text d-flex justify-content-center">{skills[skill].description}</p>
            </Row>
        </Container>
    )

    let info;
    switch (skill) {
        case "node":
            info = node;
            break;
        case "bootstrap":
            info = bootstrap;
            break;
        case "docker":
            info = docker;
            break;
        case "ec2":
            info = ec2;
            break;
        case "mysql":
            info = mysql;
            break;
        case "react":
            info = react;
            break;
        case "javascript":
            info = javascript;
            break;
        case "csharp":
            info = csharp;
            break;
        case "hii":
            info = hii;
            break;
        case "ud":
            info = ud;
            break;
        case "python":
            info = python;
            break;
        case "java":
            info = java;
            break;
        case "rust":
            info = rust;
            break;
        case "installshield":
            info = installshield;
            break;
        case "langchain":
            info = langchain;
            break;
        case "vb6":
            info = vb6;
            break;
        case "leader":
            info = leader;
            break;
        case "cycle":
            info = cycle;
            break;
        case "learning":
            info = learning;
            break;
        case "customer":
            info = customer;
            break;
        case "portfolio":
            info = portfolio;
            break;
        default:
            info = node;
    }



    return (
        <>
            {info}
        </>
    )
}

export default SkillInfo;