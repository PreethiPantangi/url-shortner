const express = require('express');
const app = express();
const config = require('./config');
const shortenUrl = require('./shortenURL');
const redirectURL = require('./redirectURL');

app.use(express.json());

const PORT = config['port'];
const HOST = config['host'];

app.post('/shorten', async(req, res) => {
    return await shortenUrl(req, res);
});

app.get('/:redirect', async (req, res) => {
    return await redirectURL(req, res);
});

app.listen(PORT, () => {
    console.log("Application running on http://" +  HOST + ":" + PORT);
});