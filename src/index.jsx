import App from "./containers/App";
import React from "react";
import ReactDOM from "react-dom";

const reactRoot = "react-root";
const reactRootElement = document.getElementById(reactRoot);

console.log(`Rendering into`, reactRootElement);

ReactDOM.render(<App/>, reactRootElement);