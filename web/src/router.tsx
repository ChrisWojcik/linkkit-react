import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/web/lib/auth';
import { DefaultLayout } from '@/web/layouts';
import { HomePage, NotFoundPage, SubmitPage, PostPage } from '@/web/pages';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/submit',
        element: (
          <ProtectedRoute redirectPath="/">
            <SubmitPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/k/:postId/:slug',
        element: <PostPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
