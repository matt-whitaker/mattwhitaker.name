import React from 'react';

export const meta = {
  title: 'Recent Blogs'
};

export default ({ blogs }) => blogs.map(({ url, title }) => (
  <p>
    <a href={url}>{title}</a>
  </p>
));