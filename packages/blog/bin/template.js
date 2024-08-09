#!/usr/bin/env node

import { buildPages } from "@mattwhitaker.name/tools";

await (
  async () =>
    await buildPages(process.argv, (args) => ({
      ext: [".ejs"],
      stylesheets: [
        "/style/blog.css"
      ],
      template: "template/master.ejs",
      root: process.cwd(),
      helpers: {
        sortedBlogs(pages) {
          const blogs = pages.filter(({ path }) => path.includes("blog"));
          return blogs;
        }
      },
      context: {
        blogs: [
          {
            tag: "Technology",
            title: "Offline web prototyping with Next.js",
            snippet: "Today I will cover a basic plan-ahead use-case for an offline web application, called a Progressive Web Application, using Node.js",
            date: "March 13, 2023"
          },
          {
            tag: "Technology",
            title: "Offline web prototyping with Next.js",
            snippet: "Today I will cover a basic plan-ahead use-case for an offline web application, called a Progressive Web Application, using Node.js",
            date: "March 13, 2023"
          },
          {
            tag: "Technology",
            title: "Offline web prototyping with Next.js",
            snippet: "Today I will cover a basic plan-ahead use-case for an offline web application, called a Progressive Web Application, using Node.js",
            date: "March 13, 2023"
          },
          {
            tag: "Technology",
            title: "Offline web prototyping with Next.js",
            snippet: "Today I will cover a basic plan-ahead use-case for an offline web application, called a Progressive Web Application, using Node.js",
            date: "March 13, 2023"
          },
          {
            tag: "Technology",
            title: "Offline web prototyping with Next.js",
            snippet: "Today I will cover a basic plan-ahead use-case for an offline web application, called a Progressive Web Application, using Node.js",
            date: "March 13, 2023"
          }
        ]
      }
    }))
)();