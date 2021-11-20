import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { IconComment, IconExternalLink } from '@/components/icons';
import Button from '@/components/Button';
import TimeAgo from '@/components/TimeAgo';
import MaybeLink from '@/components/MaybeLink';
import roundWithPrecision from '@/lib/roundWithPrecision';
import truncateLink from '@/lib/truncateLink';

import styles from './Post.module.scss';

function Post({ post, linkify, isFocal, id, className, onClick, ...props }) {
  const $link = useRef(null);

  function onPostClick() {
    if (window.getSelection().toString().length > 0) {
      return;
    }

    $link.current.click();

    if (onClick) {
      onClick();
    }
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function friendlyCommentCount() {
    if (post.numComments === 0 && !isFocal) {
      return 'Comment';
    } else if (post.numComments < 1000) {
      return `${post.numComments} Comment${post.numComments !== 1 ? 's' : ''}`;
    } else {
      return `${roundWithPrecision(
        post.numComments / 1000,
        1,
        'floor'
      )}k Comments`;
    }
  }

  const PostTitle = isFocal ? 'h1' : 'h2';

  return (
    <article
      id={id}
      className={classNames(className, styles.post, isFocal && styles.isFocal)}
      onClick={!isFocal ? onPostClick : onClick || undefined}
      aria-labelledby={id && `${id}__title`}
      aria-describedby={id && `${id}__body`}
      {...props}
    >
      <header className={styles.header}>
        <p className={styles.meta}>
          Posted by u/
          <span aria-hidden="true" className={styles.metaSeparator}>
            •
          </span>
          <MaybeLink
            isLink={linkify}
            href={post.permalink}
            onClick={stopPropagation}
          >
            <TimeAgo dateTime={post.createdAt} />
          </MaybeLink>
        </p>
        <PostTitle id={id && `${id}__title`} className={styles.title}>
          <MaybeLink
            isLink={linkify}
            href={post.permalink}
            onClick={stopPropagation}
            ref={$link}
          >
            {post.title}
          </MaybeLink>
        </PostTitle>
      </header>
      <div id={id && `${id}__body`} className={styles.body}>
        {post.sharedLink && (
          <a
            href={post.sharedLink}
            className={styles.outboundLink}
            rel="noreferrer noopener nofollow"
            target="_blank"
            onClick={!isFocal ? stopPropagation : undefined}
          >
            {truncateLink(post.sharedLink, 24)} <IconExternalLink />
          </a>
        )}
        {post.text && <p className={styles.text}>{post.text}</p>}
      </div>
      <footer className={styles.footer}>
        <MaybeLink
          isLink={linkify}
          href={post.permalink}
          onClick={stopPropagation}
        >
          <Button
            component={'span'}
            className={classNames(styles.footerButton, styles.commentButton)}
            variant="white"
            size="small"
            icon={<IconComment />}
          >
            {friendlyCommentCount()}
          </Button>
        </MaybeLink>
      </footer>
    </article>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  isFocal: PropTypes.bool,
  linkify: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    title: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    sharedLink: PropTypes.string,
    numComments: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

Post.defaultProps = {
  isFocal: false,
  linkify: true,
};

export default Post;
