import React from 'react';
import Nav from './shell/nav';

export default ({ children, $site, $page }) => [
  <header className="mw-header">
    <img className="mw-site-avatar" src={$site.avatarImage} />
    <h1 className="mw-site-title">{$site.title}</h1>
    <Nav items={$site.nav} />
  </header>,
  <main className="mw-main mw-blog">
    <article>
      { $page.blog ? <time className="mw-blog-date">{$page.blog.date}</time> : null }
      <h1 className="mw-page-title">{$page.title}</h1>
      {children}
    </article>
  </main>,
  <footer className="mw-footer" style={{textAlign: 'center'}}>
    { $page.blog ? 'prev | next' : null };
  </footer>
];