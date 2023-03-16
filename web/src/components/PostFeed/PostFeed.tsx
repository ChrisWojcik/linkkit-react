import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { tabbable } from 'tabbable';
import { useLatestPostsQuery } from '@/web/lib/api';
import Post from '@/web/components/Post';

import './PostFeed.scss';

type PostFeedProps = React.ComponentPropsWithoutRef<'div'>;

const PAGE_UP_KEY = 33;
const PAGE_DOWN_KEY = 34;
const END_KEY = 35;
const HOME_KEY = 36;

function PostFeed({
  className,
  onKeyDown: onKeyDownProp,
  ...props
}: PostFeedProps) {
  const $feed = useRef(null);
  const $loadingIndicator = useRef(null);

  const { data, isFetching, fetchNextPage, hasNextPage } =
    useLatestPostsQuery();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    });

    const el = $loadingIndicator && $loadingIndicator.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, $loadingIndicator]);

  // https://w3c.github.io/aria-practices/examples/feed/feed.html
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const $target = e.target as HTMLElement;
    let $currentArticle: HTMLElement;
    let $firstArticle: HTMLElement;

    switch (e.keyCode) {
      case PAGE_UP_KEY:
        e.preventDefault();
        $currentArticle = $target.closest('.post-feed__item') as HTMLElement;

        if ($currentArticle && $currentArticle.previousElementSibling) {
          $currentArticle.previousElementSibling.scrollIntoView();
          ($currentArticle.previousElementSibling as HTMLElement).focus();
        }

        break;
      case PAGE_DOWN_KEY:
        e.preventDefault();
        $currentArticle = $target.closest('.post-feed__item');

        if ($currentArticle && $currentArticle.nextElementSibling) {
          $currentArticle.nextElementSibling.scrollIntoView();
          ($currentArticle.nextElementSibling as HTMLElement).focus();
        }
        break;
      case END_KEY:
        if (e.ctrlKey) {
          e.preventDefault();

          // since there are no focusable elements after the feed,
          // wrap back up to the top of the page
          const allFocusableElements = tabbable(document.body);
          allFocusableElements[0].focus();
        }
        break;
      case HOME_KEY:
        if (e.ctrlKey) {
          e.preventDefault();

          const allFocusableElements = tabbable(document.body);
          $firstArticle = $feed.current.querySelector('.post-feed__item');

          const indexOfFirstArticle =
            allFocusableElements.indexOf($firstArticle);

          if (indexOfFirstArticle > 0) {
            const previousFocusableElement =
              allFocusableElements[indexOfFirstArticle - 1];
            previousFocusableElement.focus();
          }
        }
        break;
      default:
        break;
    }

    if (onKeyDownProp) {
      onKeyDownProp(e);
    }
  }

  return (
    <div
      ref={$feed}
      className={classNames('post-feed', className)}
      onKeyDown={onKeyDown}
      role="feed"
      aria-busy={isFetching}
      {...props}
    >
      {data?.pages &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.posts.map((post, indexOnPage) => (
              <Post
                className="post-feed__item"
                key={post.id}
                post={post}
                linkify={true}
                tabIndex={0}
                aria-posinset={
                  data.pages[0].posts.length * pageIndex + indexOnPage + 1
                }
                aria-setsize={-1}
              />
            ))}
          </React.Fragment>
        ))}
      {(isFetching || hasNextPage) && (
        <span
          ref={$loadingIndicator}
          aria-hidden="true"
          className="post-feed__loading-indicator"
        />
      )}
    </div>
  );
}

export default PostFeed;
