import React from 'react';
import Nav from './nav';

export default function(props) {
  return (
    <header className="mw-header">
      <img className="mw-site-avatar" src={props.$site.avatarImage} />
      <h1 className="mw-site-title">{props.$site.title}</h1>
      <Nav items={props.$site.nav} />
    </header>
  );
}