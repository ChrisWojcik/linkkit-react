import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import Post from '@/components/Post';
import getFocusableChildren from '@/lib/getFocusableChildren';

import styles from './PostList.module.scss';

const PAGE_UP_KEY = 33;
const PAGE_DOWN_KEY = 34;
const END_KEY = 35;
const HOME_KEY = 36;

function PostList() {
  const $feed = useRef(null);
  const $loadingIndicator = useRef(null);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam }) => fetchLatestPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );

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
  function onKeyDown(e) {
    let currentArticle;
    let firstArticle;

    switch (e.keyCode) {
      case PAGE_UP_KEY:
        e.preventDefault();
        currentArticle = e.target.closest('.' + styles.listItem);

        if (currentArticle && currentArticle.previousElementSibling) {
          currentArticle.previousElementSibling.scrollIntoView({
            block: 'center',
          });
          currentArticle.previousElementSibling.focus();
        }

        break;
      case PAGE_DOWN_KEY:
        e.preventDefault();
        currentArticle = e.target.closest('.' + styles.listItem);

        if (currentArticle && currentArticle.nextElementSibling) {
          currentArticle.nextElementSibling.scrollIntoView({ block: 'center' });
          currentArticle.nextElementSibling.focus();
        }
        break;
      case END_KEY:
        if (e.ctrlKey) {
          e.preventDefault();

          // since there are no focusable elements after the feed,
          // wrap back up to the top of the page
          const allFocusableElements = getFocusableChildren(document);
          allFocusableElements[0].focus();
        }
        break;
      case HOME_KEY:
        if (e.ctrlKey) {
          e.preventDefault();

          const allFocusableElements = getFocusableChildren(document);
          firstArticle = $feed.current.querySelector('.' + styles.listItem);

          const indexOfFirstArticle =
            allFocusableElements.indexOf(firstArticle);

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
  }

  return (
    <div
      ref={$feed}
      className={styles.list}
      role="feed"
      aria-busy={isFetching}
      onKeyDown={onKeyDown}
    >
      {data &&
        data.pages &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.posts.map((post, indexOnPage) => (
              <Post
                key={post.id}
                id={`post-${post.id}`}
                post={post}
                className={styles.listItem}
                tabIndex="0"
                aria-posinset={
                  data.pages[0].posts.length * pageIndex + indexOnPage + 1
                }
                aria-setsize="-1"
              />
            ))}
          </React.Fragment>
        ))}
      {(isFetching || hasNextPage) && (
        <span
          ref={$loadingIndicator}
          aria-hidden="true"
          className={styles.loadingIndicator}
        />
      )}
    </div>
  );
}

async function fetchLatestPosts(cursor) {
  const params = cursor ? `?cursor=${cursor}` : '';
  const res = await fetch(`/api/posts.latest${params}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong.');
  }

  return json;
}

export default PostList;
