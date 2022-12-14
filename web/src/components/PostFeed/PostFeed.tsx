import React from 'react';

import { useLatestPostsQuery } from '@/web/lib/api';
import Post from '@/web/components/Post';

import './PostFeed.scss';

function PostFeed() {
  const { data, isFetching } = useLatestPostsQuery();

  return (
    <div className="post-feed" aria-busy={isFetching}>
      {data &&
        data.map((post) => (
          <Post
            className="post-feed__item"
            key={post.id}
            post={post}
            linkify={true}
          />
        ))}
    </div>
  );
}

export default PostFeed;
