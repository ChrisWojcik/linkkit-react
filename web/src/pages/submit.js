import classNames from 'classnames';
import Head from 'next/head';

import SubmitPostForm from '@/components/SubmitPostForm';
import DefaultLayout from '@/components/layouts/DefaultLayout';

import utilityStyles from '@/styles/utilities.module.scss';

export default function Submit() {
  return (
    <>
      <Head>
        <title>Submit to Linkkit</title>
      </Head>
      <div
        className={classNames(
          utilityStyles.containerNarrow,
          utilityStyles['pt-xl'],
          utilityStyles['pb-xl']
        )}
      >
        <SubmitPostForm />
      </div>
    </>
  );
}

Submit.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
