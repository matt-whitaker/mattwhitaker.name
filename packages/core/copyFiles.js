import fs from "fs-extra";
import { join } from "path";
import { parseArgs } from "./utils/cli.js";

/**
 * @typedef {object} CopyFilesOptions
 * @property {string} root project root (cwd)
 */

/**
 * Copy files over (cross-os safe)
 * @async
 * @param argv
 * @param optionsFn {function(object):CopyFilesOptions}
 * @returns {Promise<void>}
 */
export const copyFiles = async (argv, optionsFn) => {
  const args = parseArgs(argv, [
    {
      "name": "source",
      "description": "specific page for static generation",
      "defaultValue": "static"
    },
  ]);
  const options = optionsFn(args);

  try {
    await fs.copy(join(options.root, args.source), join(options.root, args.output));
  } catch (err) {
    console.error(`Error! ${err}`);
  }
}