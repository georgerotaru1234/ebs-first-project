import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from 'features/dashboard';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isKey = localStorage.hasOwnProperty('key') && localStorage.getItem('key') !== 'undefined' ? true : false;
  return (
    // Show the component only when the user is logged in
    <Route
      {...rest}
      render={(props) =>
        isKey ? (
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
