import React from 'react';

import Footer from './footer';
import Main from './main';
import Header from './header';

export default function (props) {
  return [
    <Header {...props} />,
    <Main {...props} />,
    <Footer {...props} />
  ];
}
