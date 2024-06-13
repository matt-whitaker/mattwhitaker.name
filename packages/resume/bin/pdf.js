#!/usr/bin/env node

import puppeteer from "puppeteer";
const serverBase = "http://localhost:8080/";

(async () => {
  try {
    const pages = process.env.NODE_ENV === "production" ? ["resume.html"] : ["resume.html", "cover.html"];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 8.5 * 96,
      height: 11 * 96,
    });

    for(let i = 0; i < pages.length; i++) {
      await page.goto(`${serverBase}${pages[i]}`, { waitUntil: "networkidle0" });
      await page.pdf({
        path: `dist/${pages[i].split(".")[0]}.pdf`,
        format: "Letter",
        printBackground: true
      });
    }

    await browser.close();
  } catch (error) {
    console.error(`Error! ${error}`);
  }
})();
