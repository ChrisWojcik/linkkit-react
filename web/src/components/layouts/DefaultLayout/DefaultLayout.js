import React from 'react';
import Head from 'next/head';

import SkipLink from '@/components/SkipLink';
import MainNav from '@/components/MainNav';

function DefaultLayout(props) {
  return (
    <>
      <Head>
        <link
          href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
          rel="icon"
          type="image/x-icon"
        />
      </Head>
      <header>
        <SkipLink href="#content">Skip to main content</SkipLink>
        <MainNav />
      </header>
      <main id="content">{props.children}</main>
    </>
  );
}

export default DefaultLayout;
