const http = require('node:http');
const fs = require('node:fs');
const express = require('express'); 
const cors = require('cors'); 
const credentials = require('./credentials.js'); 
require('dotenv').config(); 

const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}

const cred = new credentials.Credentials(); 

const app = express(); 
app.use(express.static(process.env.FRONTEND_DIR))
app.use(express.json()); 
app.use(cors(corsOptions)); 
const port = 8080;

app.all('*', (req, res, next) => {
    console.log(`Incoming ${req.method} request on ${req.url}`);
    if (req.body) {
        console.log("Request body: ");
        console.log(req.body);
    }
    next();  
});

app.get('/', (req, res) => {
    res.sendFile(process.env.FRONTEND_DIR + "index.html"); 
    res.sendFile(process.env.FRONTEND_DIR + "bundle.js"); 
});

app.post('/register', async (req, res) => { 
    if (!(await cred.doesUserExist(req.body.username))) {
        console.log(`User ${req.body.username} doesn't exist; registering.`);
        cred.registerUser(
            req.body.username, 
            req.body.password, 
            req.body.fname, 
            req.body.lname
        ); 
        const message = `User ${req.body.username} registered`;
        console.log(message); 
        res.status(201).send(message); 
    } else {
        const message = `User ${req.body.username} already exists`;
        console.log(message); 
        res.status(204).send(message);
    }
});

app.post('/login', async (req, res) => { 
    if (await cred.doesUserExist(req.body.username)) {
        if (await cred.isPasswordCorrect(req.body.username, req.body.password)) {
            const message = `Logging in as ${req.body.username}`;
            console.log(message); 
            res.status(200).json({message: message}); 
        } else {
            const message = "Incorrect password; try again.";
            console.log(message); 
            res.status(401).json({status: "incorrect password", message: message});
        }
    } else {
        const message = `User ${req.body.username} not found`;
        console.log(message); 
        res.status(401).json({status: "username not found", message: message});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});