import React from 'react';
import { Outlet } from 'react-router-dom';

import SkipLink from '@/web/components/SkipLink';
import MainNav from '@/web/components/MainNav';

export default function DefaultLayout() {
  return (
    <>
      <header>
        <SkipLink href="#content">Skip to content</SkipLink>
        <MainNav />
      </header>
      <main id="content">
        <Outlet />
      </main>
    </>
  );
}
