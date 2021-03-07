import React from 'react';

import { devices } from '@app/types/types';

export const device = {
  type: devices.MOBILE
};

export const DeviceContext = React.createContext<{
  type: devices;
}>(device);
