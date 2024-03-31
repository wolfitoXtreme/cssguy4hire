import { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import IconClose from '@/stories/assets/icon-close.svg';

import { NotificationContext } from './NotificationContext';

import styles from './Notification.module.scss';

const notificationIn = {
  enter: styles['my-node-enter'],
  enterActive: styles['my-node-enter-active'],
  exit: styles['my-node-exit'],
  exitActive: styles['my-node-exit-active'],
};

const duration = parseInt(styles['transition-duration']);

const Notification: React.FC<{
  message: string | null;
  exitNotification: boolean;
}> = ({ message, exitNotification }) => {
  const nodeRef = useRef(null);
  const [transitionIn, setTransitionIn] = useState(false);
  const { hideNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (message) {
      setTransitionIn(true);
    }
    if (exitNotification) {
      setTransitionIn(false);
    }
  }, [message, exitNotification]);

  const setTransitionOut = () => {
    setTransitionIn(false);
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={transitionIn}
      timeout={duration}
      unmountOnExit
      onExited={hideNotification}
      classNames={notificationIn}>
      <div
        ref={nodeRef}
        onClick={setTransitionOut}
        className={styles.notification}>
        {message && (
          <p
            dangerouslySetInnerHTML={{ __html: message }}
            className={styles['notification-message']}
          />
        )}
        <IconClose className={styles['notification-icon']} />
      </div>
    </CSSTransition>
  );
};

export default Notification;
