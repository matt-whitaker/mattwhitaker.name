import React from 'react';

export default ({ items }) => (
  <nav className="mw-site-nav">
    <ul className="mw-nav-list">
      {items.map(({ text, url }, key) => (
        <li className="mw-nav-item" key={key}>
          <a className="mw-nav-link" href={url}>{text}</a>
        </li>
      ))}
    </ul>
  </nav>
);