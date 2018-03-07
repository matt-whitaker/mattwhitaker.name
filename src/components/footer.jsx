import React from 'react';

const renderPageNav = (blog) => blog ? 'prev | next' : null;

export default function(props) {
  return (
    <footer className="mw-footer" style={{textAlign: 'center'}}>
      {renderPageNav(props.$page.blog)}
    </footer>
  );
}