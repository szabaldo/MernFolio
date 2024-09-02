const http = require('node:http');
const fs = require('node:fs');
const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}

const app = express(); 
app.use(express.static(process.env.FRONTEND_DIR))
app.use(express.json()); 
app.use(cors(corsOptions)); 
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(process.env.FRONTEND_DIR + "index.html"); 
    res.sendFile(process.env.FRONTEND_DIR + "bundle.js"); 
});

app.post('/register', (req, res) => {
    console.log("Got something"); 
    console.log(req.method); 
    console.log(req.url); 
    console.log(req.body); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});