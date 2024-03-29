import React from 'react';

import { Button as MUIButton, ButtonProps } from '@material-ui/core/';

import { ReactComponent as IconArrow } from '@app/assets/icons/icon-button-arrow.svg';

import {
  button,
  buttonDisabled,
  buttonLabel,
  buttonIcon
} from './Button.module.scss';

interface ButtonInt extends ButtonProps {
  icon?: 'start' | 'end';
}

const Button: React.FC<ButtonInt> = ({
  variant = 'outlined',
  icon,
  disabled,
  ...rest
}) => (
  <>
    <MUIButton
      classes={{
        outlined: button,
        label: buttonLabel,
        endIcon: buttonIcon,
        disabled: buttonDisabled
      }}
      variant={variant}
      disabled={disabled}
      endIcon={icon && <IconArrow />}
      {...rest}
    ></MUIButton>
  </>
);

export default Button;
