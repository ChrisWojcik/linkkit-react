import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrentUserContext, ProtectedRoute } from '@/web/lib/auth';
import { DefaultLayout } from '@/web/layouts';
import { HomePage, NotFoundPage, SubmitPage, PostPage } from '@/web/pages';

export default function Router() {
  const { isAuthenticated } = useContext(CurrentUserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                redirectPath="/"
                element={<SubmitPage />}
              />
            }
          />
          <Route path="/k/:postId/:slug" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
