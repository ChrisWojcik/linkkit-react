import React from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import { IconEdit } from '@/components/icons';

import styles from './PostListToolbar.module.scss';

function PostListToolbar() {
  return (
    <div className={styles.postListToolbar}>
      <Link href="/submit" passHref>
        <Button icon={<IconEdit />} component={'a'}>
          Create Post
        </Button>
      </Link>
    </div>
  );
}

export default PostListToolbar;
