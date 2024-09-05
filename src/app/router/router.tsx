import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoaderPage, ScrollToTop } from 'shared/ui';

import { ErrorBoundaryFallback } from 'widgets/error-boundary/error-boundary';

import { AppRoutes } from './route-config';

export interface RouteItem {
  title: string;
  path: string;
  Component: (p?: any) => JSX.Element;
  authOnly?: boolean;
}

export const Router = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ScrollToTop />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Routes>
          <Route path="*" element={<Navigate to={AppRoutes.home} replace />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
};
