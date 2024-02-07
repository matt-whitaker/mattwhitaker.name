import args from "args";
import { resolve, relative, extname } from "path";
import { render } from "ejs";
import { readdir, readFile as _readFile, writeFile as _writeFile } from "fs/promises";

import config from "./cli.config.js";

export const readFile = async (fullpath) => _readFile(fullpath, "utf8");

export const writeFile = async (fullpath, data) => {
  return _writeFile(fullpath, data);
}

export const resolvePath = (...args) => resolve(process.cwd(), ...args);

export const parseArgs = (argv) => args.options(config).parse(argv);

export const resolveOutputPath = (path, name, output, ext) =>
  resolvePath(path, relative(path, resolvePath(output)), name.replace(extname(name), ext))

export const renderEjs = async (contents, context) => render(contents, context, { async: true })

export const listDirectory = async (dir, recursive = true, extensions = []) =>
  (await readdir(resolvePath(dir), { withFileTypes: true, recursive }))
    .filter(file => !file.isDirectory() && extensions.includes(extname(file.name)));

export const loadFiles = async (dir, recursive = true, extensions = []) => Promise.all(
  (await listDirectory(dir, recursive, extensions))
    .map(async ({ path, name }) => ({ content: await readFile(resolvePath(path, name)), path, name })));
