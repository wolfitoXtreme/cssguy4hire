import React from 'react';
import classNames from 'classnames';
import {
  buttonGroup,
  buttonGroupInverted
} from '@app/components/Form/Button/Button.module.scss';

const ButtonGroup: React.FC<{
  children: React.ReactNode;
  inverted?: boolean;
}> = ({ children, inverted = false }) => (
  <div className={classNames(buttonGroup, { [buttonGroupInverted]: inverted })}>
    {children}
  </div>
);

export default ButtonGroup;
