[![CircleCI](https://circleci.com/gh/matt-whitaker/mattwhitaker.name/tree/master.svg?style=svg)](https://circleci.com/gh/matt-whitaker/mattwhitaker.name/tree/master)

# [mattwhitaker.name](https://mattwhitaker.name)
my personal profile site

## Writing

The app is built to support two types of views, pages and blogs. Blogs are placed in the `blogs` src directory and pages are placed in the `pages` src directory. Ultimately all this does it make it easier to partition blogs into a `/blog` subroute.

### Pages

Pages are written in handlebars.

### Blogs

Blogs are written in markdown.

## Development

### Install

`npm install` 

### Environment variables

None

### Running the app

`npm start`, browser will open automatically

## Deployment

This site follows a continuously integrated deployment model. When develop is merged into changes are flushed to the staging website. When master is merged into, changes are flushed to production.
