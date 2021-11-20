import classNames from 'classnames';
import Head from 'next/head';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import PostListToolbar from '@/components/PostListToolbar';
import PostList from '@/components/PostList';

import utilityStyles from '@/styles/utilities.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Linkkit</title>
      </Head>
      <div
        className={classNames(
          utilityStyles.container,
          utilityStyles['pt-l'],
          utilityStyles['pb-l']
        )}
      >
        <PostListToolbar />
        <PostList />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
