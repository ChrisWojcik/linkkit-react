import React from 'react';
import { Helmet } from 'react-helmet';

import PostFeedToolbar from '@/web/components/PostFeedToolbar';
import PostFeed from '@/web/components/PostFeed';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Linkkit</title>
      </Helmet>
      <div className="container pv-l">
        <PostFeedToolbar />
        <PostFeed aria-label="Latest Posts" />
      </div>
    </>
  );
}
