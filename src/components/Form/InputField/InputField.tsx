import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { isMobile } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
  InputProps
} from '@material-ui/core/';
import { composeValidators } from '@app/utils/validators';
import { SASSvarsToJason } from '@app/utils/utils';
import { ReactComponent as IconArrow } from '@app/assets/icons/icon-select-arrow.svg';

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
  inputSelect,
  inputSelectNative,
  inputPlaceholder,
  selectIcon,
  menu,
  menuWrapper,
  menuItem,
  menuItemSelected,
  helper,
  helperError,
  helperHidden,
  breakpoints as SASSBreakpoints
} from './InputField.module.scss';

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

const Icon: React.FC<{ props: any }> = (props) => (
  <div {...props}>
    <IconArrow />
  </div>
);

export interface InputFieldInt extends InputProps {
  type?: 'text' | 'select';
  label: string;
  fieldName: string;
  options?: { value: string | number; label: string }[];
  defaultOption?: string;
  shrink?: boolean;
  disableAnimation?: boolean;
  validators?: { (...args: any[]): void }[];
}

const InputField: React.FC<InputFieldInt> = ({
  type,
  label: labelText,
  fieldName,
  placeholder,
  options = [],
  defaultOption = 'Choose an option',
  fullWidth,
  shrink,
  multiline,
  rows,
  disabled,
  disableAnimation,
  validators
}) => {
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };
  const breakPoints = SASSvarsToJason(SASSBreakpoints);
  const matchMediaQuery = useMediaQuery({ minWidth: breakPoints['medium'] });
  const fieldId = 'id-' + fieldName;
  const labelId = fieldId + '-label';
  const inputStyles = {
    root: fieldInput,
    disabled: fieldInputDisabled,
    error: fieldInputError,
    focused: fieldInputFocused,
    input: input,
    notchedOutline: fieldInputOutlined,
    multiline: fieldInputMultiline
  };

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
                  id={labelId}
                  htmlFor={fieldId}
                  data-text={labelText}
                  shrink={shrinkLabel}
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
                {type === 'text' && (
                  <OutlinedInput
                    id={fieldId}
                    name={fieldName}
                    multiline={multiline}
                    rows={rows}
                    onChange={onChange}
                    value={value}
                    placeholder={placeHolderText()}
                    disabled={disabled}
                    classes={inputStyles}
                    error={error}
                  />
                )}
                {type === 'select' && (
                  <Select
                    labelId={labelId}
                    id={fieldId}
                    name={fieldName}
                    placeholder={placeHolderText()}
                    displayEmpty
                    native={isMobile}
                    disabled={disabled}
                    input={
                      <OutlinedInput
                        classes={{
                          ...inputStyles,
                          input: classNames(input, {
                            [inputPlaceholder]: meta.invalid
                          })
                        }}
                        error={error}
                      />
                    }
                    inputProps={{
                      onChange: onChange,
                      value: value
                    }}
                    value={selectValue}
                    onChange={(event) => {
                      handleSelectChange(event);
                    }}
                    IconComponent={(props) => <Icon {...props} />}
                    classes={{
                      root: classNames(inputSelect, {
                        [inputSelectNative]: isMobile
                      }),
                      icon: selectIcon
                    }}
                    MenuProps={{
                      classes: {
                        paper: menuWrapper
                      },
                      MenuListProps: {
                        classes: { root: menu }
                      }
                    }}
                  >
                    <SelectOption
                      isMobile={isMobile}
                      value=""
                      classes={{ root: menuItem, selected: menuItemSelected }}
                    >
                      {defaultOption}
                    </SelectOption>
                    {options.map((option) => (
                      <SelectOption
                        isMobile={isMobile}
                        key={option.value}
                        value={option.value}
                        classes={{
                          root: menuItem,
                          selected: menuItemSelected
                        }}
                      >
                        {option.label}
                      </SelectOption>
                    ))}
                  </Select>
                )}

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

export default InputField;
