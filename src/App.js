import './App.css';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Posts from './posts/pages/Posts'
import Cms from './cms/pages/Cms'
import MainNavigation from './shared/components/navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/posts" exact>
          <Posts />
        </Route>
        <Route path='/cms' exact>
          <Cms />
        </Route>
        <Redirect to='/posts' />
      </Switch>
  </Router>
  );
}

export default App;
