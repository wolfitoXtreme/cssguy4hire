import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { createStore, compose } from 'redux';

import { RootReducer } from '@store/reducers/index';

import { DeviceProvider } from '@app/context/DeviceContext/DeviceContext';
import { MenuProvider } from '@app/context/MenuContext/MenuContext';

import Reference from '@app/components/Reference/Reference';
import Main from '@app/components/Main';
import Maintenance from '@app/components/Maintenance/Maintenance';

import './styles/App.scss';

require('dotenv').config();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers());

const isMaintenance = process.env.REACT_APP_MAINTENANCE === 'true';

const App = () => {
  return (
    <Provider store={store}>
      <DeviceProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              path="/"
              render={(props) =>
                (isMaintenance && <Maintenance {...props} />) || (
                  <MenuProvider>
                    <Main {...props} />
                  </MenuProvider>
                )
              }
              exact
            />
            <Route
              path="/development/"
              render={(props) => (
                <MenuProvider>
                  <Main {...props} />
                </MenuProvider>
              )}
              exact
            />
            <Route
              path="/maintenance/"
              render={(props) => <Maintenance {...props} />}
              exact
            />
            <Route
              path="/reference/"
              render={(props) => <Reference {...props} />}
              exact
            />
          </Switch>
        </BrowserRouter>
      </DeviceProvider>
    </Provider>
  );
};

export default App;
