import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Login from './Login'; 
import Register from './Register';
import Admin from './Admin';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Customs.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/* <React.StrictMode> */}
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        {/* </React.StrictMode> */}
    </BrowserRouter>
);