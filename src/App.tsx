import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import { MenuProvider } from '@app/context/MenuContext/MenuContext';
import { devices } from '@app/types/types';

import { RootReducer } from './store/reducers/index';
import Reference from './components/Reference/Reference';
import Main from './components/Main';
import Maintenance from './components/Maintenance/Maintenance';
import { breakpoints as SASSBreakpoints } from './components/Main.module.scss';
import './styles/App.scss';
import { SASSvarsToJason } from './utils/utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers());

const breakPoints = SASSvarsToJason(SASSBreakpoints);

const getDeviceType = (mediaQuery) =>
  mediaQuery ? devices.MOBILE : devices.DESKTOP;

const maintenance = true;

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
            <Route
              path="/"
              render={(props) =>
                (maintenance && <Maintenance {...props} />) || (
                  <MenuProvider>
                    <Main {...props} />
                  </MenuProvider>
                )
              }
              exact
            />
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
