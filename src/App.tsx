import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Reference from './components/Reference/Reference';
import Main from './components/Main';

import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => <Main {...props} />} exact />
        <Route
          path="/reference/"
          render={(props) => <Reference {...props} />}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
