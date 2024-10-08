import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ModalContext } from './App.js';


function Modal({ inner, width, left="", right="", top="", animStart, animEnd}) {
    const { modalList , setModalList } = useContext(ModalContext); 

    const modalBodyClasses = `${width} ${animStart}`

    useEffect( () => {
        const sambar = document.getElementById("sambar");
        const mainPage = document.getElementById("mainPage");
        if (modalList.length > 0) {
            if (!mainPage.classList.contains("blur-anim")) {
                mainPage.classList.remove("unblur-anim");
                sambar.classList.remove("unblur-anim"); 
                mainPage.offsetHeight;
                sambar.offsetHeight;
                mainPage.classList.add("blur-anim"); 
                sambar.classList.add("blur-anim");
            }
        }
    }, [modalList]);

    const close = () => {
        const bg = document.getElementById("modalBackground");
        const box = document.getElementById("modalBox"); 
        const sambar = document.getElementById("sambar");
        const mainPage = document.getElementById("mainPage");

        box.classList.remove(animStart);
        box.offsetHeight;
        box.classList.add(animEnd);

        bg.classList.remove("fade-in-50");
        bg.offsetHeight;
        bg.classList.add("fade-out-50");

        mainPage.classList.remove("blur-anim");
        mainPage.offsetHeight;
        mainPage.classList.add("unblur-anim"); 
    
        sambar.classList.remove("blur-anim");
        sambar.offsetHeight;
        sambar.classList.add("unblur-anim");

        setTimeout( () => {
            setModalList(modalList.filter( (modal) => {console.log(modal); true }))
        }, 1000)
    }

    return (
        <div>
            <div className="fade-in-50 position-fixed bg-black t-0 l-0 h-100vh w-100vw overflow-hidden" id="modalBackground" />
            <Container className={`position-fixed p-3 rounded border shadow bg-white ${modalBodyClasses}`} style={{left: left, right: right, top: top}} id="modalBox">
                <Row>
                    <img src="x.png" className="cursor-pointer" style={{ width: "50px" }} onClick={close}></img>
                </Row>
                <Row>
                    {inner}
                </Row>
            </Container>
        </div>
    );
}

export default Modal;
