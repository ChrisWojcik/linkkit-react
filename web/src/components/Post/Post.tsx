import React, { useRef, useId, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { IconComment, IconExternalLink } from '@/web/components/icons';
import Button from '@/web/components/Button';
import TimeAgo from '@/web/components/TimeAgo';
import {
  roundWithPrecision,
  truncateLink,
  removeOriginFromUrl,
} from '@/web/lib/utils';
import { PostWithNormalizedComments } from '@/web/lib/api';

import './Post.scss';

type A11yFeedItemProps = {
  ['aria-setsize']: number;
  ['aria-posinset']: number;
};

type PostProps = React.ComponentPropsWithoutRef<'article'> &
  A11yFeedItemProps & {
    isFocal?: boolean;
    linkify?: boolean;
    post: PostWithNormalizedComments;
  };

function Post({
  id,
  post,
  linkify = false,
  isFocal = false,
  className,
  onClick,
  ...props
}: PostProps) {
  const generatedId = useId();
  const idAttribute = id || generatedId;

  const $link = useRef<HTMLAnchorElement>(null);

  const href = useMemo(
    () => removeOriginFromUrl(post.permalink),
    [post.permalink]
  );

  function onPostClick(e: React.MouseEvent<HTMLElement>) {
    if ((window.getSelection() as Selection).toString().length > 0) {
      return;
    }

    if ($link.current) {
      $link.current.click();
    }

    if (onClick) {
      onClick(e);
    }
  }

  function stopPropagation(e: React.MouseEvent) {
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
      id={idAttribute}
      className={classNames(className, 'post', isFocal && 'post--is-focal')}
      onClick={linkify ? onPostClick : onClick || undefined}
      aria-labelledby={`${idAttribute}__title`}
      aria-describedby={`${idAttribute}__body`}
      {...props}
    >
      <header className="post__header">
        <p className="post__meta">
          Posted by u/{post.user.username}
          <span aria-hidden="true" className="post__meta-separator">
            •
          </span>
          {linkify ? (
            <Link to={href} onClick={stopPropagation}>
              <TimeAgo dateTime={post.createdAt} />
            </Link>
          ) : (
            <TimeAgo dateTime={post.createdAt} />
          )}
        </p>
        <PostTitle id={`${idAttribute}__title`} className="post__title">
          {linkify ? (
            <Link to={href} onClick={stopPropagation} ref={$link}>
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </PostTitle>
      </header>
      <div id={`${idAttribute}__body`} className="post__body">
        {post.sharedLink && (
          <span className="post__outbound-link-wrap">
            <a
              href={post.sharedLink}
              className="post__outbound-link"
              rel="noreferrer noopener nofollow"
              target="_blank"
              onClick={linkify ? stopPropagation : undefined}
            >
              {truncateLink(post.sharedLink, 24)}
              <IconExternalLink />
            </a>
          </span>
        )}
        {post.text && <p className="post__text">{post.text}</p>}
      </div>
      <footer className="post__footer">
        <Button
          as={linkify ? Link : 'span'}
          to={linkify ? href : null}
          onClick={linkify ? stopPropagation : undefined}
          className="post__footer-button post__comment-button"
          variant="white"
          size="small"
          icon={<IconComment />}
        >
          {friendlyCommentCount()}
        </Button>
      </footer>
    </article>
  );
}

export default Post;
