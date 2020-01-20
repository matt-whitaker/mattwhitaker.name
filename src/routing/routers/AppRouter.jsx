import { BrowserRouter } from 'react-router-dom';
import React from 'react';

/**
 * Wrapper for choosing which React Router to use.
 * @param props
 * @returns {*}
 * @constructor
 */
export const AppRouter = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);
