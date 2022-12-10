import React from 'react';
import { Helmet } from 'react-helmet';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1 tabIndex={-1}>Not Found</h1>
    </>
  );
}
