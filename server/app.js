const http = require('node:http');
const fs = require('node:fs');
const express = require('express'); 
require('dotenv').config(); 

const app = express(); 
app.use(express.static(process.env.FRONTEND_DIR))
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(process.env.FRONTEND_DIR + "index.html"); 
    res.sendFile(process.env.FRONTEND_DIR + "bundle.js"); 
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});