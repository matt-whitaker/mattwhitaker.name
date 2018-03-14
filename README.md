[![CircleCI](https://circleci.com/gh/matt-whitaker/mattwhitaker.name/tree/master.svg?style=svg)](https://circleci.com/gh/matt-whitaker/mattwhitaker.name/tree/master)

# [mattwhitaker.name](https://mattwhitaker.name)
my personal profile site

## Writing

The app is built to support two types of views, pages and blogs. Blogs are placed in the `blogs` src directory and pages are placed in the `pages` src directory. Ultimately all this does it make it easier to partition blogs into a `/blog` subroute.

Example page:

```
import React from 'react';

export const meta = {
  title: 'Page Title'
};

export default () => (
  <p>Page content here</p>
);
```

### Markdown support

App also supports markdown, useful for writing blogs or very simple pages.

Example markdown page (or blog)

```
export const meta = {
  date: '2017-10-05',
  title: 'Blog Title'
};

export default `
# A header

A very basic paragraph element

- a
- short
- list

|a|table|
|---|---|
|hello|world|
`;
```

## Development

### Install

`npm install` will install both `npm` and `bower` dependencies

To setup `blog-tools` for simultaneous development also run

`npm install --save-dev -f ./blog-tools`

to point the local version to the submodule

### Environment variables

None

### Running the app

`npm start`, browser will open automatically

## Deployment

This site follows a continuously integrated deployment model. When develop is merged into changes are flushed to the staging website. When master is merged into, changes are flushed to production.
