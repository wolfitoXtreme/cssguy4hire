import { createContext, useEffect, useState } from 'react';

import Notification from './Notification';

export type TNotification = {
  message: string;
};

export const NotificationContext = createContext<{
  hideNotification: () => void;
  notification: TNotification | null;
  showNotification: (notificationData: TNotification) => void;
}>({
  hideNotification: () => {},
  notification: null,
  showNotification: () => {},
});

export const NotificationContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<TNotification | null>(null);

  const [exitNotification, setExitNotification] = useState(false);

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setExitNotification(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const showNotificationHandler: {
    (args: TNotification): void;
  } = notificationData => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setExitNotification(false);
    setActiveNotification(null);
  };

  const context = {
    hideNotification: hideNotificationHandler,
    notification: activeNotification,
    showNotification: showNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
      <Notification
        message={context.notification?.message || null}
        exitNotification={exitNotification}
      />
    </NotificationContext.Provider>
  );
};
