import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper for choosing which React Router to use.
 *
 * @param {object} props
 * @param {*} props.children
 * @returns {*}
 */
export const AppRouter = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

AppRouter.propTypes = {
  children: PropTypes.element,
};