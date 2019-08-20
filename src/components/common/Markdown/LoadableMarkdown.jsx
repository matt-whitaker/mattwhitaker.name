import axios from "axios";
import loadable from "@loadable/component";
import React from "react";
import Markdown from "./Markdown";

/**
 * Loads markdown from the provided URL.
 */
export default class LoadableMarkdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

  }

  // Loadable = loadable(() => Promise.resolve());
  //
  // constructor(props) {
  //   super(props);
  //   this.state = { markdown: null, error: null };
  // }
  //
  // render() {
  //   const { Loadable } = this;
  //
  //   return (
  //     <Loadable />
  //   );
  //
  //   if (this.state.markdown) {
  //     return <Markdown>{this.state.markdown}</Markdown>;
  //   } else if (this.state.error) {
  //     return <>There was an error: {this.state.error.message}</>;
  //   } else {
  //     return <>Loading...</>;
  //   }
  // }

  // componentDidMount() {
  //   (async () => {
  //     try {
  //       const response = ;
  //       this.setState({ markdown: response.data });
  //     } catch (error) {
  //       this.setState({ error });
  //     }
  //   })();
  // }
}