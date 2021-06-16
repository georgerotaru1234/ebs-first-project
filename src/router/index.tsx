import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from 'features/Dashboard';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isKey = localStorage.hasOwnProperty('id') && localStorage.getItem('id') !== 'undefined' ? true : false;
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
