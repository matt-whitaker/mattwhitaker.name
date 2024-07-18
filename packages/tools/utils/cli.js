import args from "args";

const defaultArgs = [
  {
    "name": "output",
    "description": "distribution directory",
    "defaultValue": "dist"
  },
  {
    "name": "config",
    "description": "config file for global site data",
    "defaultValue": "site.config.json"
  },
  {
    "name": "dev",
    "description": "",
    "defaultValue": false,
  }
];

/**
 * Loads CLI arguments
 * @param {string} argv
 * @param {object[]} optionalArgs
 * @returns {object} an object of arguments
 */
export const parseArgs = (argv, optionalArgs = []) => args.options(defaultArgs).options(optionalArgs).parse(argv);