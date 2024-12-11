import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import skills from './skills.json' with {type: 'json'};
import Skill from './Skill.js';

export const NodeSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const NodeInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.node.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.node.description}</p>
        </Row>
    </Container>
);

export const BootstrapSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const BootstrapInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.bootstrap.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.bootstrap.description}</p>
        </Row>
    </Container>
);

export const DockerSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const DockerInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.docker.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.docker.description}</p>
        </Row>
    </Container>
);

export const Ec2Skills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const Ec2Info = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.ec2.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.ec2.description}</p>
        </Row>
    </Container>
);

export const MysqlSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const MysqlInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.mysql.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.mysql.description}</p>
        </Row>
    </Container>
);

export const ReactSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const ReactInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.react.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.react.description}</p>
        </Row>
    </Container>
);

export const JavascriptSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const JavascriptInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.javascript.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.javascript.description}</p>
        </Row>
    </Container>
);

export const CsharpSkills = [
    skills['react'],
    skills['javascript'],
    skills['bootstrap'],
    skills['docker'],
    skills['ec2'],
    skills['mysql']
]
export const CsharpInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.csharp.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.csharp.description}</p>
        </Row>
    </Container>
);

export const HiiSkills = [
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
export const HiiInfo = (
    <Container className="large-text" style={{ overflowWrap: "anywhere" }}>
        <h1 className="text-center">{skills.hii.title}</h1>
        <h2 className="text-center">Engineer Software 2</h2>
        <br />
        <ul className="large-text" style={{ listStylePosition: "inside" }}>
            <li>
                Lead team in maintaining and developing a desktop application, using C#, that allows users to manipulate and save radio parameter presets for multi-radio platforms
            </li>
            <li>
                Built a RESTful front-end application, using React, that tracks, organizes, and visualizes sets of user-definable geographic locations along a 3D globe interface
            </li>
            <li>
                Designed AI application to compare PDF documents using LangChain and large language models
            </li>
            <li>
                Maintained legacy desktop application, using VB6, that models radio frequency interactions among groundand air-based radios
            </li>
            <li>
                Designed installation executables, using InstallShield, for both standard and secure Windows systems
            </li>
            <li>
                Collected and refine project requirements and user stories directly from clients
            </li>
            <li>
                Lead meetings and manage team’s communication with clients
            </li>
        </ul>
    </Container>
);

export const UdSkills = [
    skills['java']
];
export const UdInfo = (
    <Container className="large-text" style={{ overflowWrap: "anywhere" }}>
        <h1 className="text-center">{skills.ud.title}</h1>
        <h2 className="text-center">Bachelor of Science, Computer Science</h2>
        <h3 className="text-center">Graduated 2021, GPA 3.6</h3>
        <br />
        <h3>Teaching Assistant</h3>
        <h4>Intro to Computer Science II & Intro to Systems Engineering</h4>
        <ul>
            <li>Helped students understand the C programming language, shell scripting, and Linux/Unix basics</li>
            <li>Assisted students with lab assignments and core understanding of foundational programming concepts</li>
            <li>Held weekly lab sessions and office hours; coordinated with professor to ensure labs ran smoothly</li>
        </ul>
    </Container>
);

export const PythonSkills = [
    skills['langchain'],
    skills['hii']
]
export const PythonInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.python.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.python.description}</p>
        </Row>
    </Container>
);

export const JavaSkills = [
    skills['ud']
]
export const JavaInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.java.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.java.description}</p>
        </Row>
    </Container>
);

export const RustSkills = [
    skills['hii']
];
export const RustInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.rust.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.rust.description}</p>
        </Row>
    </Container>
);

export const InstallshieldSkills = [
    skills['hii']
];
export const InstallshieldInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.installshield.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.installshield.description}</p>
        </Row>
    </Container>
);

export const LangchainSkills = [
    skills['python'],
    skills['hii']
]
export const LangchainInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.langchain.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.langchain.description}</p>
        </Row>
    </Container>
);

export const Vb6Skills = [
    skills['hii']
]
export const Vb6Info = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.vb6.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.vb6.description}</p>
        </Row>
    </Container>
);

export const LeaderSkills = [
    skills['hii']
];
export const LeaderInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.leader.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.leader.description}</p>
        </Row>
    </Container>
);

export const CycleSkills = [
    skills['hii']
];
export const CycleInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.cycle.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.cycle.description}</p>
        </Row>
    </Container>
);

export const LearningSkills = [
    skills['react'],
    skills['csharp'],
    skills['python'],
    skills['rust'],
    skills['installshield'],
    skills['langchain'],
    skills['vb6'],
    skills['hii']
];
export const LearningInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.learning.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.learning.description}</p>
        </Row>
    </Container>
);

export const CustomerSkills = [
    skills['hii']
];
export const CustomerInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.customer.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.customer.description}</p>
        </Row>
    </Container>
);

export const PortfolioSkills = [

];
export const PortfolioInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">{skills.portfolio.title}</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">{skills.portfolio.description}</p>
        </Row>
    </Container>
);

export const BrokenInfo = (
    <Container>
        <Row className="py-1">
            <h2 className="large-text d-flex justify-content-center">EVERYTHING'S BROKEN</h2>
            <br />
            <p className="medium-text d-flex justify-content-center">AHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!</p>
        </Row>
    </Container>
);
