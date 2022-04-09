import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Settings from './pages/Settings';
import './Css/App.css';

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/feadback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/questions" component={ Questions } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
