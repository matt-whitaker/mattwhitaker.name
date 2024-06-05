#!/usr/bin/env node

import puppeteer from "puppeteer";

(async () => {
  const pages = ["resume.html", "cover.html"];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:8080/cover", { waitUntil: "networkidle0" });
  await page.pdf({
    path: "dist/cover.pdf",
    format: "Letter",
    printBackground: true
  });

  await browser.close();
})();
