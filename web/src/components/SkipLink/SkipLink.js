import React from 'react';
import PropTypes from 'prop-types';

import styles from './SkipLink.module.scss';

function SkipLink(props) {
  return (
    <a href={props.href} className={styles.skipLink}>
      {props.children}
    </a>
  );
}

SkipLink.propTypes = {
  href: PropTypes.string,
};

export default SkipLink;
