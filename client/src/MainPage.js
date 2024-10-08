import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 

function MainPage() {
    const location = useLocation();
    const isIntro = useRef(true); 
    
    useEffect( () => {
        setTimeout(() => {
            isIntro.current = false; 
        }, 1000);
    });

    return (
        <div id="mainPage">
            <Outlet context={isIntro} />
        </div>
    );
}

export default MainPage;