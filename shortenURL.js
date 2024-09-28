const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('./config');
const { saveUrl, getOriginalUrl } = require('./urlStore'); 

async function shortenURL(req, res) {
  const { originalUrl } = req.body;
  const baseUrl = 'https://' + config['host'];

  console.log("In shorten");
  console.log(originalUrl);
  

  if (!validUrl.isUri(baseUrl)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Invalid base URL' }));
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(originalUrl)) {
    try {
        const existingShortUrl = getOriginalUrl(originalUrl);
      if (existingShortUrl) {
        return res.render('index', { originalUrl: originalUrl, shortUrl: existingShortUrl });
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;
        saveUrl(urlCode, originalUrl);
        return res.render('index', { originalUrl: originalUrl, shortUrl: shortUrl });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = shortenURL;
