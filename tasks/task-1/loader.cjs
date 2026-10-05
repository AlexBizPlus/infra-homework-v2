const yaml = require("yaml");
const fs = require("node:fs");

const BUFFER_ENCODING = "utf8";
const EXTENSIONS = [".yaml", ".yml"];

function parseYml(module, filename) {
  const content = fs.readFileSync(filename, BUFFER_ENCODING);
  try {
    module.exports = yaml.parse(content);
  } catch (err) {
    err.message = filename + ": " + err.message;
    throw err;
  }
}

for (const ext of EXTENSIONS) {
  require.extensions[ext] = parseYml;
}
