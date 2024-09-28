// const fs = require('fs');
// const path = require('path');

// const urlStorePath = path.join(__dirname, 'urlStore.json');

// let urlStore = {};

// async function loadUrlStore() {
//     if (fs.existsSync(urlStorePath)) {
//         const data = fs.readFileSync(urlStorePath, 'utf-8');
//         urlStore = JSON.parse(data);
//     }
// }

// async function saveUrlStore() {
//     fs.writeFileSync(urlStorePath, JSON.stringify(urlStore, null, 2), 'utf-8');
// }

// loadUrlStore();

// function saveUrl(urlCode, originalUrl) {
//     urlStore[urlCode] = originalUrl;
//     saveUrlStore(); 
// }

// function getUrl(urlCode) {
//     return urlStore[urlCode];
// }

// function getOriginalUrl(originalUrl) {
//     return urlStore[originalUrl];
// }

// module.exports = {
//     saveUrl,
//     getUrl,
//     getOriginalUrl,
// };

// urlStore.js
const urlStore = {};

function saveUrl(urlCode, originalUrl) {
    urlStore[urlCode] = originalUrl;
}

function getUrl(urlCode) {
    return urlStore[urlCode];
}

function getOriginalUrl(originalUrl) {
    return urlStore[originalUrl];
}

module.exports = {
    saveUrl,
    getUrl,
    getOriginalUrl,
};
