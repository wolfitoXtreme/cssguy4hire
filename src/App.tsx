import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { createStore, compose } from 'redux';

import { devices } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import { MenuProvider } from '@app/context/MenuContext/MenuContext';
import { SASSvarsToJason } from '@app/utils/utils';
import Reference from '@app/components/Reference/Reference';
import Main from '@app/components/Main';
import Maintenance from '@app/components/Maintenance/Maintenance';

import { RootReducer } from '@store/reducers/index';

import { breakpoints as SASSBreakpoints } from './components/Main.module.scss';
import './styles/App.scss';

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
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
      </DeviceContext.Provider>
    </Provider>
  );
};

export default App;
