import React from 'react';
import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';
import Nav from './nav';

const renderDate = (blog) => blog ? (
    <time className="mw-blog-date">
      <span className="mw-date-value">{blog.date}</span>
      <span className="mw-date-bar" />
    </time>
  ): null;

const renderPage = (props) => {
  const { Page } = props;
  return typeof Page === 'string' ? <Markdown>{Page}</Markdown> : <Page {...props} />;
};

const renderPageNav = (blog) => blog ? 'prev | next' : null;

export default (props) => [
  <header className="mw-header">
    <img className="mw-site-avatar" src={props.$site.avatarImage} />
    <h1 className="mw-site-title">{props.$site.title}</h1>
    <Nav items={props.$site.nav} />
  </header>,
  <main className={classnames({ 'mw-main': true, 'mw-blog': props.$page.blog })}>
    <article>
      {renderDate(props.$page.blog)}
      <h1 className="mw-page-title">{props.$page.title}</h1>
      {renderPage(props)}
    </article>
  </main>,
  <footer className="mw-footer" style={{textAlign: 'center'}}>
    {renderPageNav(props.$page.blog)}
  </footer>
];