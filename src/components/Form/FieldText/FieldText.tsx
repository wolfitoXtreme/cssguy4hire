import React from 'react';
import { TextField as MUITextField, TextFieldProps } from '@material-ui/core/';

import {
  fieldWrapper,
  fieldLabel,
  fieldLabelOutlined,
  fieldLabelFocused,
  fieldLabelDisabled,
  fieldLabelShrink,
  fieldLabelAnimated,
  fieldInput,
  fieldInputOutlined,
  fieldInputFocused,
  fieldInputDisabled,
  fieldInputMultiline,
  input
} from './FieldText.module.scss';

type FieldTexType = { shrink?: boolean } & TextFieldProps;

const FieldText: React.FC<FieldTexType> = ({
  variant = 'outlined',
  shrink,
  ...rest
}) => {
  const { label: labelText } = rest;

  const inputProps = {
    classes: {
      root: fieldInput,
      focused: fieldInputFocused,
      input: input,
      disabled: fieldInputDisabled,
      notchedOutline: fieldInputOutlined,
      multiline: fieldInputMultiline
    }
  };

  const inputLabelProps = {
    shrink: shrink,
    'data-text': labelText,
    classes: {
      root: fieldLabel,
      focused: fieldLabelFocused,
      outlined: fieldLabelOutlined,
      disabled: fieldLabelDisabled,
      shrink: fieldLabelShrink,
      animated: fieldLabelAnimated
    }
  };

  return (
    <>
      <MUITextField
        variant={variant}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        classes={{ root: fieldWrapper }}
        {...rest}
      />
      {/* <>{select?.toString()}</> */}
      {/* <pre>{JSON.stringify(children, null, 2)}</pre> */}
    </>
  );
};

export default FieldText;
