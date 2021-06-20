import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PrivateRoute } from 'router/index';
import Login from './features/Login';
import Register from './features/Register';
import Posts from 'components/Posts';
import Users from 'components/Users';
import CreateUser from 'features/CreateUser';
import UserDetails from 'features/UserDetails';
import EditUser from 'features/EditUser';
import './styles/index.scss';

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
