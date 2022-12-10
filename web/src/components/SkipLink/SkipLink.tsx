import React from 'react';

import './SkipLink.scss';

function SkipLink(props) {
  return (
    <a href={props.href} className="skip-link">
      {props.children}
    </a>
  );
}

export default SkipLink;
