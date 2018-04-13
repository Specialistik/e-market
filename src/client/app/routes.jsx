import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SignIn from './components/views/sign_in';
import SignUp from './components/views/sign_up';
import PickRole from './components/views/pick_role';
export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='sign_in' component={SignIn} />
    <Route path='sign_up' component={SignUp} />
    <Route path='pick_role' component={PickRole} />
    <Route path='*' component={Home} />
  </Route>
);