import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Searchs from './pages/Searchs';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search/:username" component={(props) => <Searchs {...props} />} />
        <Route component={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
