import { extname, resolve } from "path";
import { readdir, readFile as _readFile, writeFile as _writeFile } from "fs/promises";

import { EXT_EJS, EXT_MD, EXT_HTML } from "./constants.js";

/**
 * typedef {Object} File
 * @property {string} name Name of the file
 * @property {string} path Path to the file
 * @property {object|string} [data] File contents
 */

/**
 * Reads a file's content
 * @async
 * @param fullpath
 * @param parser
 * @returns {Promise<string>}
 */
export const readFile = async (fullpath, parser) =>
  parser ? parser(await _readFile(fullpath, "utf8")) : _readFile(fullpath, "utf8");
/**
 * Reads a file, but swallows errors and returns null instead
 * @param fullpath
 * @param parser
 * @returns {Promise<string>}
 */
export const tryReadFile = async (fullpath, parser) =>
  parser ? _readFile(fullpath, "utf8").then(parser).catch(() => null) : _readFile(fullpath, "utf8").catch(() => null)
/**
 * Writes data to a file
 * @async
 * @param {string} fullpath
 * @param {string} data
 * @returns {Promise<void>} a promise mostly useful for error handling
 */
export const writeFile = async (fullpath, data) => {
  return _writeFile(fullpath, data);
}
/**
 * Resolves a series of component into a path
 * @param  {...string[]} args list of string parts of a path
 * @returns {string} the resolved path
 */
export const resolvePath = (...args) => resolve(process.cwd(), ...args);
/**
 * Lists a directory, optionally recursively or filtered by extensions
 * @async
 * @param {string} dir
 * @param {boolean} recursive
 * @param {(EXT_EJS,EXT_MD)[]} exts
 * @returns {Promise<File[]>} a promise of a list of files (metadata only)
 */
export const listDirectory = async (dir, recursive = true, exts = []) =>
  (await readdir(resolvePath(dir), { withFileTypes: true, recursive }))
    .filter(file => !file.isDirectory() && (exts.length ? exts.includes(extname(file.name)) : true));
/**
 * Loads a directory of files, optionally recursively or filtered by extensions
 * @async
 * @param {string} dir directory to load
 * @param {boolean} recursive include subdirectories
 * @param {(EXT_EJS,EXT_MD)[]} extensions include only these extensions
 * @returns {Promise<File[]>} a promise of a list of loaded files
 */
export const loadFiles = async (dir, recursive = true, extensions = []) => Promise.all(
  (await listDirectory(dir, recursive, extensions))
    .map(async ({ path, name }) => ({ data: await readFile(resolvePath(path, name)), path, name })));
/**
 * Resolves a template path for output, including renaming the extension .html
 * @param {string} output
 * @param {string} name
 * @param {(EXT_HTML)} ext
 * @returns {string} a fully resolved and renamed filename/path
 */
export const resolveOutputPath = (output, name, ext = EXT_HTML) =>
  resolvePath(output, name.replace(extname(name), ext))