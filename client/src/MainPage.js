import React from 'react';
import { Outlet } from 'react-router-dom'; 

function MainPage({ id }) {
    return (
        <div id={id} className="position-relative">
            <Outlet />
        </div>
    );
}

export default MainPage;