import React from 'react';
import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';

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

export default function(props) {
  return (
    <main className={classnames({ 'mw-main': true, 'mw-blog': props.$page.blog })}>
      <article>
        {renderDate(props.$page.blog)}
        <h1 className="mw-page-title">{props.$page.title}</h1>
        {renderPage(props)}
      </article>
    </main>
  );
}