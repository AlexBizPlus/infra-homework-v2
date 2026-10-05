const yaml = require("yaml");
const fs = require("node:fs");

const BUFFER_ENCODING = "utf8";
const EXTENTIONS = [".yaml", ".yml"];

function ParseYml(module, filename) {
  const content = fs.readFileSync(filename, BUFFER_ENCODING);
  try {
    module.exports = yaml.parse(content);
  } catch (err) {
    err.message = filename + ": " + err.message;
    throw err;
  }
}

EXTENTIONS.forEach((ext) => (require.extensions[ext] = ParseYml));
