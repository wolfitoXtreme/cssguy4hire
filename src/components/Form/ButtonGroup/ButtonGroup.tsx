import React from 'react';

import classNames from 'classnames';

import {
  buttonGroup,
  buttonGroupInverted,
  buttonGroupCentered
} from '@app/components/Form/Button/Button.module.scss';

const ButtonGroup: React.FC<{
  children: React.ReactNode;
  variant?: 'inverted' | 'centered';
}> = ({ children, variant }) => (
  <div
    className={classNames(buttonGroup, {
      [buttonGroupInverted]: variant === 'inverted',
      [buttonGroupCentered]: variant === 'centered'
    })}
  >
    {children}
  </div>
);

export default ButtonGroup;
