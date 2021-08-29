import React, { useContext, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { useWindowResize } from '@app/hooks/useWindowResize';
import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';
import { ReactComponent as IconResize } from '@app/assets/icons/icon-resize-up.svg';

import {
  notDisplayable,
  notDisplayableActive,
  notDisplayableEnabled,
  notDisplayableText,
  notDisplayableIcon
} from './NotDisplayable.module.scss';

const activeStylePropName = 'outline-style';
const activeStylePropVal = 'solid';
const transitionStylePropName = 'opacity';

const NotDisplayable: React.FC = () => {
  const { setEnablePanels, staticContent } = useContext(NavigationContext);
  const { formatMessage } = useIntl();
  const [isActive, setIsActive] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const notDisplayableRef = useRef<HTMLDivElement>(null);

  const handleDisabled = (
    target: EventTarget,
    currentTarget: EventTarget,
    property: string
  ) => {
    if (target === currentTarget && property === transitionStylePropName) {
      setIsTransitioning(false);
      if (!isEnabled) {
        setIsActive(false);
        setEnablePanels(true);
      } else {
        setEnablePanels(false);
      }
    }
  };

  useWindowResize(() => {
    if (notDisplayableRef.current) {
      const isActiveStyle =
        window
          .getComputedStyle(notDisplayableRef.current)
          .getPropertyValue(activeStylePropName) === activeStylePropVal;

      const switchOn =
        isActiveStyle && !isTransitioning && !isEnabled && !staticContent;

      const switchOff = !isActiveStyle && !isTransitioning && isEnabled;

      if (switchOn) {
        setIsActive(true);
        setIsTransitioning(true);
        setIsEnabled(true);
      } else if (switchOff) {
        setIsTransitioning(true);
        setIsEnabled(false);
      }
    }
  });

  return (
    <div
      ref={notDisplayableRef}
      className={classNames(notDisplayable, {
        [notDisplayableActive]: isActive,
        [notDisplayableEnabled]: isEnabled
      })}
      onTransitionEnd={(event) => {
        handleDisabled(event.target, event.currentTarget, event.propertyName);
      }}
    >
      <IconResize className={notDisplayableIcon} />
      <p className={notDisplayableText}>
        {formatMessage({ id: 'not-diaplayable' })}
      </p>
    </div>
  );
};

export default NotDisplayable;
