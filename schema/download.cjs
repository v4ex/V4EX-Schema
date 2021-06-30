const Https = require('https'); // or 'https' for https:// URLs
const Fs = require('fs');
const Path = require('path');
const schemaIndex = require('./index.json');

module.exports = async function () {
  await downloadSchemas();
}

// Download all registered schemas
async function downloadSchemas() {
  for (const [key, uri] of Object.entries(schemaIndex)) {
    const file = Fs.createWriteStream(Path.resolve(__dirname, 'download', `${key}.json`));
    const request = Https.get(uri, function(response) {
      response.pipe(file);
    });
  }
}
