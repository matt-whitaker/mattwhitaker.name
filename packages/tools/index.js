import args from "args";
import { resolve, relative, extname } from "path";
import { render } from "ejs";
import { readdir, readFile as _readFile, writeFile as _writeFile } from "fs/promises";

import config from "./cli.config.js";

/**
 * Reads a file 
 * @param {string} fullpath 
 * @returns {Promise<string>} a promise of the file's contents
 */
export const readFile = async (fullpath) => _readFile(fullpath, "utf8");

/**
 * Writes data to a file
 * @param {string} fullpath 
 * @param {string} data 
 * @returns {Promise<void>} a promise mostly useful for error handling
 */
export const writeFile = async (fullpath, data) => {
  return _writeFile(fullpath, data);
}

/**
 * Resolves a series of components into a path
 * @param  {...string[]} args list of string parts of a path 
 * @returns {string} the resolved path
 */
export const resolvePath = (...args) => resolve(process.cwd(), ...args);

/**
 * Loads CLI arguments
 * @param {object} argv 
 * @returns {object} an object of arguments
 */
export const parseArgs = (argv) => args.options(config).parse(argv);

/**
 * Resolves a path for output, helps with renaming
 * @param {string} path 
 * @param {string} name 
 * @param {string} output 
 * @param {string} ext 
 * @returns {string} a fully resolve and renamed fullpath
 */
export const resolveOutputPath = (path, name, output, ext) =>
  resolvePath(path, relative(path, resolvePath(output)), name.replace(extname(name), ext))

/**
 * 
 * @param {string} contents 
 * @param {object} context 
 * @returns {string} a rendered EJS template
 */
export const renderEjs = async (contents, context) => render(contents, context, { async: true })

/**
 * Lists a directory, optionally recursively or filtered by extension
 * @param {string} dir 
 * @param {boolean} recursive 
 * @param {string[]} extensions 
 * @returns {Proimse<object[]>} a promise of a list of files
 */
export const listDirectory = async (dir, recursive = true, extensions = []) =>
  (await readdir(resolvePath(dir), { withFileTypes: true, recursive }))
    .filter(file => !file.isDirectory() && extensions.includes(extname(file.name)));

/**
 * Loads a directory of files, optionally recursively or filtered by extensions
 * @param {string} dir 
 * @param {boolean} recursive 
 * @param {string[]} extensions 
 * @returns 
 */
export const loadFiles = async (dir, recursive = true, extensions = []) => Promise.all(
  (await listDirectory(dir, recursive, extensions))
    .map(async ({ path, name }) => ({ content: await readFile(resolvePath(path, name)), path, name })));
 