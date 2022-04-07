import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/questions" component={ Questions } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
