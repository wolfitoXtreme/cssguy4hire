import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {
  DeviceContext
  // deviceType
} from '@app/context/DeviceContext/DeviceContext';
import { devices } from '@app/types/types';

import { RootReducer } from './store/reducers/index';
import Reference from './components/Reference/Reference';
import Main from './components/Main';
import { breakpoints as SASSBreakpoints } from './components/Main.module.scss';
import './styles/App.scss';
import { SASSvarsToJason } from './utils/utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers());

const breakPoints = SASSvarsToJason(SASSBreakpoints);

const getDeviceType = (mediaQuery) =>
  mediaQuery ? devices.MOBILE : devices.DESKTOP;

const App = () => {
  const matchMediaQuery = useMediaQuery({
    maxWidth: parseInt(breakPoints['medium']) - 1 + 'px' // -1px, no overlap between breakpoints
  });
  const [deviceType, setDeviceType] = useState(getDeviceType(matchMediaQuery));

  useEffect(() => {
    setDeviceType(getDeviceType(matchMediaQuery));
  }, [matchMediaQuery]);

  return (
    <Provider store={store}>
      <DeviceContext.Provider value={{ type: deviceType }}>
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
      </DeviceContext.Provider>
    </Provider>
  );
};

export default App;
