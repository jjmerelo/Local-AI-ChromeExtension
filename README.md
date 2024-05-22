# Using your Local AI with Google Chrome extensions
You must do the first 3 steps of my LocalAI guide before you continue with the steps below.

## Step 1 - Setup the node proxy
Create a directory for the node file
```
mcd ollama_proxy
nano proxy.js
```

You should now see a blank screen. Copy and paste the code below into it:
```
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
```
CTRL+X to Save and Exit
ENTER to confirm the path

## Step 2 - Install nodejs and run it
```
sudo apt update
sudo apt install nodejs npm -y
```
Install it:
```
npm init -y
npm install express request cors
```
Run it:
```
node proxy.js
```

This will start the proxy server at http://localhost:3000, which will forward requests to the Ollama service and handle any CORS issues.

You can now go to google chrome's extension page (chrome://extensions/), toggle on Developer Mode, and then click on LOAD UNPACKED and point it to the directory where the main files from this directory are downloaded to.

Now, update the extension options to use the proxy server URL (http://localhost:3000) instead of directly accessing the Ollama service on port 11434.



![image](https://github.com/jjmerelo/Local-AI-ChromeExtension/assets/169418683/e6ff9772-ea96-4d39-a4ee-839ea7d4d98e)
![image](https://github.com/jjmerelo/Local-AI-ChromeExtension/assets/169418683/0b479859-862f-4bb3-b720-3614333f2d11)


