import React from 'react';
import { Helmet } from 'react-helmet';

import SubmitPostForm from '@/web/components/SubmitPostForm';

export default function SubmitPage() {
  return (
    <>
      <Helmet>
        <title>Submit to Linkkit</title>
      </Helmet>
      <div className="container-narrow pv-xl">
        <SubmitPostForm />
      </div>
    </>
  );
}
