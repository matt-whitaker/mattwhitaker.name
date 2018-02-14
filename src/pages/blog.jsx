import React from 'react';
import Truncate from 'react-truncate';

export const meta = {
  title: 'Recent Blogs'
};

export default ({ blogs }) => (
  <div className="mw-blog-list">
    {blogs.map(({ url, title }, i) => (
      <p className="mw-blog-list-item" key={i}>
        <a className="mw-blog-list-link" href={url}>{title}</a>
      </p>
    ))}
  </div>
);