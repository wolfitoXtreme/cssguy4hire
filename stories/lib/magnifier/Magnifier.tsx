import { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import classNames from 'classnames';

import IconClose from '@/stories/assets/icon-close.svg';

import { MagnifierContext } from './MagnifierContext';

import styles from './magnifier.module.scss';

const magnifierIn = {
  enter: styles['magnifier-enter'],
  enterActive: styles['magnifier-enter-active'],
  exit: styles['magnifier-exit'],
  exitActive: styles['magnifier-exit-active'],
};

const duration = parseInt(styles['transition-duration']);

const Magnifier: React.FC<{
  component: React.ReactNode;
  exitMagnifier: boolean;
  isDark: boolean;
}> = ({ component, exitMagnifier, isDark = false }) => {
  const nodeRef = useRef(null);
  const [transitionIn, setTransitionIn] = useState(false);
  const { hideMagnifier } = useContext(MagnifierContext);

  useEffect(() => {
    if (component) {
      setTransitionIn(true);
    }
    if (exitMagnifier) {
      setTransitionIn(false);
    }
  }, [component, exitMagnifier]);

  const setTransitionOut = () => {
    setTransitionIn(false);
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={transitionIn}
      timeout={duration}
      unmountOnExit
      onExited={hideMagnifier}
      classNames={magnifierIn}>
      <div
        ref={nodeRef}
        onClick={setTransitionOut}
        className={classNames(styles.magnifier, {
          [styles['magnifier--dark']]: isDark,
        })}>
        <IconClose className={styles['magnifier-icon']} />
        <div className={styles['magnifier-content']}>{component}</div>
      </div>
    </CSSTransition>
  );
};

export default Magnifier;
