const { exec } = require("child_process");
const Path = require('path');
const Fs = require('fs');
const Process = require("process");

module.exports = async function () {
  await compileSchemas();
}

async function compileSchemas() {
  const ajvBin = Path.resolve(__dirname, '..', 'node_modules', '.bin', 'ajv');

  // Folders
  const downloadFolder = Path.resolve(__dirname, 'download');
  const compileFolder = Path.resolve(__dirname, 'compile');

  // Filepaths
  const schemasPath = Path.resolve(downloadFolder, '*.json');
  const outPath = Path.resolve(compileFolder, 'schemas.cjs');

  // Compile
  // error: strict mode: unknown keyword: "discriminator"
  exec(`"${ajvBin}" compile -s "${schemasPath}" -o "${outPath}" -c ajv-formats`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });

}
