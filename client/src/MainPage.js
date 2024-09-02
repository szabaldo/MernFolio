import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Container, Row, Col } from 'react-bootstrap';
import Home from './Home.js';

function MainPage() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default MainPage;