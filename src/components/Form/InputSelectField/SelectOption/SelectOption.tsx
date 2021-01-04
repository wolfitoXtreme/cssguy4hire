import React from 'react';
import { MenuItem } from '@material-ui/core/';

interface SelectOptionInt {
  isMobile: boolean;
  value: string | ReadonlyArray<string> | number;
  classes?: Record<string, string>;
}

const SelectOption: React.FC<SelectOptionInt> = ({
  isMobile,
  value,
  classes,
  children,
  ...rest
}) => {
  return (
    (isMobile && (
      <option value={value} {...rest}>
        {children}
      </option>
    )) || (
      <MenuItem value={value} classes={classes} {...rest}>
        {children}
      </MenuItem>
    )
  );
};

export default SelectOption;
