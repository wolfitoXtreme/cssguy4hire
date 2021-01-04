import React from 'react';
import { Field } from 'react-final-form';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputProps
} from '@material-ui/core/';
import { composeValidators } from '@app/utils/validators';
import { SASSvarsToJason } from '@app/utils/utils';

import {
  fieldWrapper,
  fieldLabel,
  fieldLabelDisabled,
  fieldLabelError,
  fieldLabelFocused,
  fieldLabelOutlined,
  fieldLabelShrink,
  fieldLabelAnimated,
  fieldLabelHidden,
  fieldInput,
  fieldInputDisabled,
  fieldInputFocused,
  fieldInputError,
  fieldInputOutlined,
  fieldInputMultiline,
  input,
  helper,
  helperError,
  helperHidden,
  breakpoints as SASSBreakpoints
} from './InputTextField.module.scss';

export interface InputTextFieldInt extends InputProps {
  label: string;
  shrink?: boolean;
  fieldName: string;
  disableAnimation?: boolean;
  validators?: { (...args: any[]): void }[];
}

const InputTextField: React.FC<InputTextFieldInt> = ({
  label: labelText,
  placeholder,
  fullWidth,
  shrink,
  fieldName,
  multiline,
  rows,
  disabled,
  disableAnimation,
  validators
}) => {
  const breakPoints = SASSvarsToJason(SASSBreakpoints);
  const matchMediaQuery = useMediaQuery({ minWidth: breakPoints['medium'] });
  const fieldId = 'id-' + fieldName;

  const shrinkLabel = matchMediaQuery ? shrink || disableAnimation : true;
  const placeHolderText = () => {
    if (disableAnimation || disabled) {
      return placeholder || labelText;
    } else if (!matchMediaQuery) {
      return labelText;
    }
  };

  return (
    <>
      <FormControl fullWidth={fullWidth} classes={{ root: fieldWrapper }}>
        <Field
          name={fieldName}
          validate={
            validators ? composeValidators(...validators) : () => void 0
          }
        >
          {({ input: { onChange, value }, meta }) => {
            const errorMessage = meta.error;
            const error = errorMessage && meta.touched && meta.invalid;

            return (
              <>
                <InputLabel
                  shrink={shrinkLabel}
                  htmlFor={fieldId}
                  data-text={labelText}
                  error={error}
                  disabled={disabled}
                  disableAnimation={disableAnimation}
                  classes={{
                    root: classNames(fieldLabel, {
                      [fieldLabelHidden]: !matchMediaQuery
                    }),
                    disabled: fieldLabelDisabled,
                    error: fieldLabelError,
                    focused: fieldLabelFocused,
                    outlined: fieldLabelOutlined,
                    shrink: fieldLabelShrink,
                    animated: fieldLabelAnimated
                  }}
                >
                  {labelText}
                </InputLabel>
                <OutlinedInput
                  id={fieldId}
                  name={fieldName}
                  multiline={multiline}
                  rows={rows}
                  onChange={onChange}
                  value={value}
                  placeholder={placeHolderText()}
                  disabled={disabled}
                  classes={{
                    root: fieldInput,
                    disabled: fieldInputDisabled,
                    error: fieldInputError,
                    focused: fieldInputFocused,
                    input: input,
                    notchedOutline: fieldInputOutlined,
                    multiline: fieldInputMultiline
                  }}
                  error={error}
                />
                {error && (
                  <FormHelperText
                    error={error}
                    classes={{
                      root: classNames(helper, {
                        [helperHidden]: !matchMediaQuery
                      }),
                      error: helperError
                    }}
                  >
                    {errorMessage}
                  </FormHelperText>
                )}

                {/* {meta.error && meta.touched && <span>{meta.error}</span>} */}
              </>
            );
          }}
        </Field>
      </FormControl>
    </>
  );
};

export default InputTextField;
