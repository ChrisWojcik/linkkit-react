import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const MaybeLink = forwardRef(function MaybeLink(
  { children, isLink, href, ...linkProps },
  ref
) {
  if (!isLink) {
    return children;
  } else {
    return (
      <Link href={href}>
        <a ref={ref} {...linkProps}>
          {children}
        </a>
      </Link>
    );
  }
});

MaybeLink.propTypes = {
  isLink: PropTypes.bool,
  href: PropTypes.string.isRequired,
};

export default MaybeLink;
