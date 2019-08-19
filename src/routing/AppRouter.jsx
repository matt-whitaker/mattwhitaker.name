import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wrapper for choosing which React Router to use.
 */
export default class AppRouter extends React.Component {
  /**
   * Render the correct router and pass in children.
   * @return {*}
   */
  render() {
    return (
      <BrowserRouter>
        {this.props.children}
      </BrowserRouter>
    );
  }
}
