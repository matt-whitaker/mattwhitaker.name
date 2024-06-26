import args from "args";
import defaultArgs from "./cli.config.js";

/**
 * Loads CLI arguments
 * @param {object} argv
 * @param {object[]} optionalArgs
 * @returns {object} an object of arguments
 */
export const parseArgs = (argv, optionalArgs = []) => args.options([...defaultArgs, ...optionalArgs]).parse(argv);