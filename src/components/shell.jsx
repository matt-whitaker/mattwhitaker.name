import React from 'react';

import Footer from './footer';
import Main from './main';
import Header from './header';

const headContent = (props) =>
`<title>${props.$site.title}</title>
<!-- bower:css --><!-- endinject -->
<link href="${props.$site.google.fontsHref}" rel="stylesheet" />
<!-- inject:css --><!-- endinject -->
`;

export default function (props) {
  return (
    <html>
      <head dangerouslySetInnerHTML={{__html: headContent(props)}} />
      <body className="mw-body">
        <Header {...props} />
        <Main {...props} />
        <Footer {...props} />
      </body>
    </html>
  );
}