import React from 'react';

import type { Preview } from '@storybook/react';

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
      <NotificationContextProvider>
        <Story />
      </NotificationContextProvider>
    ),
  ],
};

export default preview;
