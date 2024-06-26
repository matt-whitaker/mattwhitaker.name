export default [
  {
    "name": "pages",
    "description": "root directory where page are stored",
    "defaultValue": "template/page"
  },
  {
    "name": "filename",
    "description": "specific page for static generation",
    "defaultValue": "resume.html"
  },
  {
    "name": "template",
    "description": "site wide main template",
    "defaultValue": "template/master.ejs"
  },
  {
    "name": "stylesheet",
    "description": "expected stylesheet file",
    "defaultValue": "style.css"
  },
  {
    "name": "output",
    "description": "directory where rendered page are stored",
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
  },
  {
    "name": "all",
    "description": "overrides any coded-in excludes",
    "defaultValue": false
  }
]