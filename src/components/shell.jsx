import React from 'react';
import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';
import Nav from './nav';

const renderPage = (props) => {
  const { Page } = props;
  return typeof Page === 'string' ? <Markdown>{Page}</Markdown> : <Page {...props} />;
};

export default (props) => [
  <header className="mw-header">
    <img className="mw-site-avatar" src={props.$site.avatarImage} />
    <h1 className="mw-site-title">{props.$site.title}</h1>
    <Nav items={props.$site.nav} />
  </header>,
  <main className={classnames({ 'mw-main': true, 'mw-blog': props.$page.blog })}>
    <article>
      { props.$page.blog ? <time className="mw-blog-date">{props.$page.blog.date}</time> : null }
      <h1 className="mw-page-title">{props.$page.title}</h1>
      {renderPage(props)}
    </article>
  </main>,
  <footer className="mw-footer" style={{textAlign: 'center'}}>
    { props.$page.blog ? 'prev | next' : null };
  </footer>
];