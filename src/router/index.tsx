import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'utils';
import Dashboard from 'features/Dashboard';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    // Show the component only when the user is logged in
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Dashboard>
            <Component {...props} />
          </Dashboard>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
