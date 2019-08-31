import { BrowserRouter } from 'react-router-dom';
import React from 'react';

/**
 * AppRouter
 *
 * Wrapper for choosing which React Router to use.
 */
export default class AppRouter extends React.Component {
  /**
   * Render the correct router and pass in children.
   * @return {React.Element}
   */
  render() {
    return (
      <BrowserRouter>
        {this.props.children}
      </BrowserRouter>
    );
  }
}
