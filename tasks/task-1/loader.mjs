import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const BUFFER_ENCODING = "utf8";
const EXTENSIONS = [".yaml", ".yml"];

export async function load(url, context, nextLoad) {
  const pathname = new URL(url).pathname;
  const extname = path.extname(pathname);

  if (!EXTENSIONS.includes(extname)) {
    return nextLoad(url, context);
  }

  try {
    const filename = fileURLToPath(url);
    const ymlContent = await fs.readFile(filename, BUFFER_ENCODING);
    const source = JSON.stringify(yaml.parse(ymlContent));

    return {
      format: "json",
      source,
      shortCircuit: true,
    };
  } catch (err) {
    err.message = filename + ": " + err.message;
    throw err;
  }
}
