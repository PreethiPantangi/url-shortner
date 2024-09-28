const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const shortenUrl = require('./shortenURL');
const redirectURL = require('./redirectURL');

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = config['port'];
const HOST = config['host'];

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/shorten', async(req, res) => {
    return await shortenUrl(req, res);
});

app.get('/:redirect', async (req, res) => {
    return await redirectURL(req, res);
});

app.listen(PORT, () => {
    console.log("Application running on http://" +  HOST + ":" + PORT);
});