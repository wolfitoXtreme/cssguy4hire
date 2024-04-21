import React from 'react';

import type { Preview } from '@storybook/react';

import { MagnifierContextProvider } from '@/stories/lib/magnifier/MagnifierContext';
import { NotificationContextProvider } from '@/stories/lib/notification/NotificationContext';
import '@/stories/styles.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <MagnifierContextProvider>
        <NotificationContextProvider>
          <Story />
        </NotificationContextProvider>
      </MagnifierContextProvider>
    ),
  ],
};

export default preview;
