import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PrivateRoute } from 'router/index';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Posts from 'features/posts/pages/Posts';
import Users from 'features/users/pages/Users';
import CreateUser from 'features/users/user/pages/CreateUser';
import UserDetails from 'features/users/user/pages/UserDetails';
import EditUser from 'features/users/user/pages/EditUser';
import 'ebs-design/dist/styles/index.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <PrivateRoute exact path="/dashboard/users" component={Users}></PrivateRoute>
          <PrivateRoute exact path="/dashboard/posts" component={Posts}></PrivateRoute>
          <PrivateRoute exact path="/dashboard/users/create" component={CreateUser}></PrivateRoute>
          <PrivateRoute exact path="/dashboard/users/:id" component={UserDetails}></PrivateRoute>
          <PrivateRoute exact path="/dashboard/users/:id/edit" component={EditUser}></PrivateRoute>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
