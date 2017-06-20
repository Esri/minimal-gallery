const fs = require('fs');
const https = require('https');
const express = require('express');
const PORT = 5555;
const root = `${__dirname}/dist`;
const app = express();

app.use(express.static(root));

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
