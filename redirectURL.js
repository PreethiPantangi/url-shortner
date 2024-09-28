const { getUrl } = require("./urlStore");

async function redirectURL(req, res) {
    const urlCode = req.params.redirect;
    const originalUrl = getUrl(urlCode);
    if(originalUrl) {
        return res.redirect(originalUrl);
    } else {
        return res.status(404).json({message: "URL not found."});
    }
}

module.exports = redirectURL;