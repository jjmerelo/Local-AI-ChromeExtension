mcd ollama_proxy
#
nano proxy.js
#
const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.post('/v1/chat/completions', (req, res) => {
    const url = 'http://localhost:11434/v1/chat/completions';

    request.post({
        url: url,
        json: req.body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
        }
    }).pipe(res);
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
#
sudo apt update
sudo apt install nodejs npm -y
#
npm init -y
npm install express request cors
#
node proxy.js

This will start the proxy server at http://localhost:3000, which will forward requests to the Ollama service and handle CORS issues.
Now, update your Chrome extension to use the proxy server URL (http://localhost:3000/v1/chat/completions) instead of directly accessing the Ollama service. This should resolve the CORS issues.
