import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/web/components/Button';
import { IconEdit } from '@/web/components/icons';
import { CurrentUserContext } from '@/web/lib/auth';

import './PostFeedToolbar.scss';

function PostFeedToolbar() {
  const { isAuthenticated } = useContext(CurrentUserContext);

  return (
    <div className="post-feed-toolbar">
      {isAuthenticated && (
        <Button icon={<IconEdit />} to="/submit" as={Link}>
          Create Post
        </Button>
      )}
    </div>
  );
}

export default PostFeedToolbar;
