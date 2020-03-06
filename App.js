import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path='/' component={Profile} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
