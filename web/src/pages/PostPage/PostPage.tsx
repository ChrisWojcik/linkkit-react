import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { NotFoundPage } from '@/web/pages';
import Post from '@/web/components/Post';
import CommentThread from '@/web/components/CommentThread';
import { usePostByIdQuery } from '@/web/lib/api';

export default function PostPage() {
  const { postId } = useParams();
  const {
    data: post,
    error,
    isFetched,
  } = usePostByIdQuery(parseInt(postId, 10));

  if (error) {
    return null;
  }

  if (!post) {
    return isFetched ? <NotFoundPage /> : null;
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <link rel="canonical" href={post.permalink} />
      </Helmet>
      <div className="container pv-xl">
        <Post
          className="mb-s"
          id={`post-${post.id}`}
          post={post}
          isFocal={true}
          linkify={false}
        />
        <CommentThread postId={post.id} comments={post.comments} />
      </div>
    </>
  );
}
