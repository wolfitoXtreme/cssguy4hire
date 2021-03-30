import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { devices } from '@app/types/types';
import { SASSvarsToJason } from '@app/utils/utils';

import { breakpoints as SASSBreakpoints } from '@app/components/Main.module.scss';

export const device = {
  type: devices.MOBILE
};

const breakPoints = SASSvarsToJason(SASSBreakpoints);

export const DeviceContext = React.createContext<{
  type: devices;
}>(device);

const getDeviceType = (mediaQuery) =>
  mediaQuery ? devices.MOBILE : devices.DESKTOP;

export const DeviceProvider: React.FC = ({ children }) => {
  const matchMediaQuery = useMediaQuery({
    maxWidth: parseInt(breakPoints['medium']) - 1 + 'px' // -1px, no overlap between breakpoints
  });

  const [deviceType, setDeviceType] = useState(getDeviceType(matchMediaQuery));

  useEffect(() => {
    setDeviceType(getDeviceType(matchMediaQuery));
  }, [matchMediaQuery]);

  return (
    <DeviceContext.Provider
      value={{
        type: deviceType
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
