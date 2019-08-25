import React from "react";
import ReactMarkdown from "react-markdown";

import "./Markdown.less";

/**
 * Markdown
 *
 * Wrapper component for ReactMarkdown
 *
 * Usage:
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
   * @returns {React.Element} The wrapper
   */
  render() {
    return (
      <div className="mw-markdown markdown-body">
        <ReactMarkdown source={this.props.children}/>
      </div>
    );
  }
}