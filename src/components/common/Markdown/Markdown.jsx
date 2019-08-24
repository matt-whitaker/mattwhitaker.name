import React from "react";
import ReactMarkdown from "react-markdown";

import "./Markdown.less";

/**
 * Wrapper component for ReactMarkdown
 *
 * @example
 * ```
 * <Markdown>
 *   # Test
 *
 *   Some `content`
 * </Markdown>
 * ```
 */
export default class Markdown extends React.PureComponent {
  /**
   * Render the wrapper
   * @returns {React.Element}
   */
  render() {

    return (
      <div className="mw-markdown markdown-body">
        <ReactMarkdown source={this.props.children}/>
      </div>
    );
  }
}