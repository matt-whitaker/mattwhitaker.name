import { parseArgs } from "./utils/cli.js";
import puppeteer from "puppeteer";

/**
 * @typedef {object} GeneratePdfOptions
 */

/**
 * Produces a PDF of the chosen page; loads via puppet
 * @async
 * @param argv {any[]} list of arguments (such as from a command line call)
 * @param optionsFn {function(object):GeneratePdfOptions}
 * @returns {Promise<void>}
 */
export const generatePdf = async (argv, optionsFn) => {
  try {
    const args = parseArgs(argv, [
      {
        "name": "page",
        "description": "specific page for static generation",
        "defaultValue": "resume.html"
      },
      {
        "name": "output",
        "description": "distribution directory",
        "defaultValue": "dist/pdf"
      },
      {
        "name": "name",
        "description": "optional output name",
        "defaultValue": ""
      }
    ]);
    const options = optionsFn(args);

    const $browser = await puppeteer.launch();
    const $page = await $browser.newPage();

    await $page.setViewport({
      width: 8.5 * 96,
      height: 11 * 96,
    });

    await $page.goto(`http://localhost:8080/${args.page}`, { waitUntil: "networkidle0" });
    await $page.pdf({
      path: `${args.output}/${args.name || args.page.split(".")[0]}.pdf`,
      format: "Letter",
      printBackground: true
    });

    await $browser.close();
  } catch (error) {
    console.error(`Error! ${error}`);
  }
}