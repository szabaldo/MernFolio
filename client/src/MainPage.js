import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 

function MainPage({ id }) {
    const location = useLocation();
    const isIntro = useRef(true); 
    
    useEffect( () => {
        setTimeout(() => {
            isIntro.current = false; 
        }, 1000);
    });

    return (
        <div id={id} className="position-relative">
            <Outlet context={isIntro} />
        </div>
    );
}

export default MainPage;