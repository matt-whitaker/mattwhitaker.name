const root = ({ title, google }) => (content) => `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <!-- bower:css --><!-- endinject -->
    <link href="${google.fontsHref}" rel="stylesheet">
    <!-- inject:css --><!-- endinject -->
  </head>
  <body class="mw-body">
    ${content}
  </body>
</html>
`;

export default root;