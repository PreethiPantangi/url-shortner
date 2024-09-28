const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('./config');
const { saveUrl, getOriginalUrl } = require('./urlStore'); 

async function shortenURL(req, res) {
  const { originalUrl } = req.body;
  const baseUrl = 'https://' + config['host'];

  if (!validUrl.isUri(baseUrl)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Invalid base URL' }));
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(originalUrl)) {
    try {
        const existingShortUrl = getOriginalUrl(originalUrl);
      if (existingShortUrl) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ originalUrl, shortUrl: existingShortUrl }));
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;
        saveUrl(urlCode, originalUrl);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ originalUrl, shortUrl }));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid URL' }));
  }
};

module.exports = shortenURL;
