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

![image](https://github.com/jjmerelo/Local-AI-ChromeExtension/assets/169418683/e6ff9772-ea96-4d39-a4ee-839ea7d4d98e)
![image](https://github.com/jjmerelo/Local-AI-ChromeExtension/assets/169418683/0b479859-862f-4bb3-b720-3614333f2d11)


