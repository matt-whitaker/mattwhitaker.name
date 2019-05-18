import axios from "axios";
import React from "react";
import Markdown from "./Markdown";

/**
 * Loads markdown from the provided URL.
 */
export default class LoadableMarkdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { markdown: null, error: null };
  }

  render() {
    if (this.state.markdown) {
      return <Markdown>{this.state.markdown}</Markdown>;
    } else if (this.state.error) {
      return <>There was an error: {this.state.error.message}</>;
    } else {
      return <>Loading...</>;
    }
  }

  componentDidMount() {
    (async () => {
      try {
        const response = await axios.get(this.props.url);
        this.setState({ markdown: response.data });
      } catch (error) {
        this.setState({ error });
      }
    })();
  }
}