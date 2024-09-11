const http = require('node:http');
const fs = require('node:fs');
const express = require('express'); 
const cors = require('cors'); 
const credentials = require('./credentials.js'); 
const session = require('express-session'); 
require('dotenv').config(); 

const corsOptions = {
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
}

const sessionOptions = {
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    }

}

const cred = new credentials.Credentials(); 

const app = express(); 
app.use(express.static(process.env.FRONTEND_DIR))
app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use(session(sessionOptions))
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
            const credentials = await cred.getCredentials(req.body.username); 
            req.session.user = credentials;
            req.session.save(); 
            res.status(200).json({user: req.session.user, message: message}); 
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

app.get('/user', (req, res) => {
    if (req.session.user) {
        console.log("req.session below: ")
        console.log(req.session.user); 
        res.json({user: req.session.user, message: "got session"});
    } else {
        res.status(404).json({message: "no session"})
    }
});

app.get('/logout', (req, res) => {
    const message = "session destroyed"; 
    console.log(message); 
    req.session.destroy();  
    res.json({message: message});
});

app.post('/comment', (req, res) => {
    const message = `Comment stored for review by admin: ${req.body.comment}`;
    console.log(message); 
    cred.storeComment(req.body.comment, req.session.user.id); 
    res.json({message: message}); 
});

app.post('/get-comments', async (req, res) => {
    const comments = await cred.fetchComments(req.body.status); 
    console.log(comments); 
    res.json({comments: comments}); 
});

app.post('/approve', async (req, res) => {
    cred.approveComment(req.body.commentId);
    const message = `comment approved`;
    console.log(message); 
    res.json({message: message}); 
});

app.delete('/delete', async (req, res) => {
    cred.deleteComment(req.body.commentId);
    const message = `comment deleted`;
    console.log(message); 
    res.json({message: message}); 
});

app.put('/hide', async (req, res) => {
    cred.hideComment(req.body.commentId);
    const message = `comment hidden`;
    console.log(message); 
    res.json({message: message}); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});