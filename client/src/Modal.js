import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ModalContext } from './App.js';

function Modal({
    children,
    modalId,
    onClose = (() => { }),
    animStart = [{ keyframes: null, duration: 1000 }],
    animEnd = [{ keyframes: null, duration: 1000 }],
    style = {},
    positionStyle = {},
    disableScroll = false
}) {
    const backgroundOpacity = 0.5;
    const blurAmount = 10;
    let modalList = useContext(ModalContext);
    if (modalList.current.indexOf(modalId) === -1) modalList.current.push(modalId);
    style.zIndex = modalList.current.length + 1;

    useEffect(() => {
        if (disableScroll) document.body.style.overflow = "hidden";

        if (modalList.current.length >= modalList.lastLength) {
            let modalBackgrounds = document.getElementsByName("modalBackground");
            let modalBackground = modalBackgrounds[modalBackgrounds.length - 1];
            let sambar = document.getElementById("sambar");
            let mainPage = document.getElementById("mainPage");
            let modalBoxes = document.getElementsByName("modalBox");
            let modalBox = modalBoxes[modalBoxes.length - 1];
            modalBoxes = Array.from(modalBoxes).slice(0, modalBoxes.length - 1);

            const blurDuration = 1000;
            sambar.animate({ filter: [`blur(${blurAmount * modalList.current.length}px)`] }, { duration: blurDuration, fill: "forwards" });
            mainPage.style.zIndex = "-1";
            mainPage.animate({ filter: [`blur(${blurAmount * modalList.current.length}px)`] }, { duration: blurDuration, fill: "forwards" });
            for (const modalBox of modalBoxes) modalBox.animate({ filter: [`blur(${blurAmount * (modalList.current.length - 1)}px)`] }, { duration: blurDuration, fill: "forwards" });

            const backgroundFadeDuration = 1000;
            modalBackground.animate({ opacity: [0, backgroundOpacity] }, { duration: backgroundFadeDuration, fill: "forwards" });

            for (const anim of animStart) {
                modalBox.animate(anim.keyframes, anim.duration);
            }
        }
    });

    const close = (closeCallback) => {
        if (disableScroll) document.body.style.overflow = "auto";

        let modalBackgrounds = document.getElementsByName("modalBackground");
        let modalBackground = modalBackgrounds[modalBackgrounds.length - 1];
        let sambar = document.getElementById("sambar");
        let mainPage = document.getElementById("mainPage");
        let modalBoxes = document.getElementsByName("modalBox");
        let modalBox = modalBoxes[modalBoxes.length - 1];
        modalBoxes = Array.from(modalBoxes).slice(0, modalBoxes.length - 1);

        const blurDuration = 250;
        sambar.animate({ filter: [`blur(${blurAmount * (modalList.current.length - 1)}px)`] }, { duration: blurDuration, fill: "forwards" });
        mainPage.animate({ filter: [`blur(${blurAmount * (modalList.current.length - 1)}px)`] }, { duration: blurDuration, fill: "forwards" });
        for (const modalBox of modalBoxes) modalBox.animate({ filter: [`blur(${blurAmount * (modalList.current.length - 2)}px)`] }, { duration: blurDuration, fill: "forwards" });

        const backgroundFadeDuration = 250;
        modalBackground.animate({ opacity: [0] }, { duration: backgroundFadeDuration, fill: "forwards" });

        for (const anim of animEnd) {
            modalBox.animate(anim.keyframes, anim.duration);
        }

        const longestAnimationDuration = Math.max(backgroundFadeDuration, ...animEnd.map((anim) => anim.duration.duration ? anim.duration.duration : anim.duration));

        setTimeout(() => {
            modalList.lastLength = modalList.current.length;
            modalList.current.pop();
            if (modalList.current.length < 1) mainPage.style.zIndex = "0";
            closeCallback();
        }, longestAnimationDuration);
    }

    return (
        <Container className="position-fixed d-flex" style={positionStyle}>
            <div className="position-fixed bg-black t-0 l-0 h-100vh w-100vw overflow-hidden" style={{ zIndex: modalList.current.length + 1, opacity: 0.5 }} id="modalBackground" name="modalBackground" />
            <Container className="position-absolute p-3 rounded border shadow bg-white" style={style} id="modalBox" name="modalBox">
                <Row>
                    <img src="x.png" className="cursor-pointer" style={{ width: "50px" }} onClick={() => close(onClose)}></img>
                </Row>
                <Row>
                    {children}
                </Row>
            </Container>
        </Container>
    );
}

export default Modal;
