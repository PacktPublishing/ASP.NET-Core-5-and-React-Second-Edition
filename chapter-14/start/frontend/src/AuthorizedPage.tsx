import React from 'react';
import { Page } from './Page';
import { useAuth } from './Auth';

export const AuthorizedPage: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Page title="You do not have access to this page">{null}</Page>;
  }
};
