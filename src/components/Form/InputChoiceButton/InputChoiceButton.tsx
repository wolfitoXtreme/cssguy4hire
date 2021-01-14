import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio
} from '@material-ui/core';
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
} from '@app/components/Form/InputField/InputField.module.scss';

import {
  choicesGrid,
  choicesWrapper,
  choice,
  choiceLabel,
  choiceLabelChecked,
  choiceRadio,
  choiceIcon,
  choiceIconChecked,
  choiceCheckbox
} from './InputChoiceButton.module.scss';
interface InputChoiceButtonInt {
  type: 'radiobutton' | 'checkbox';
  label?: string;
  fieldName: string;
  options: {
    label: string;
    value: any;
  }[];
  defaultValue?: any;
  disabled?: boolean;
  validators?: { (...args: any[]): void }[];
}

const InputChoiceButton: React.FC<InputChoiceButtonInt> = ({
  type: fieldType,
  label: labelText,
  fieldName,
  options,
  defaultValue,
  disabled,
  validators
}) => {
  const [defaultVal] = useState<any[]>(
    defaultValue && fieldType === 'checkbox' ? [defaultValue] : defaultValue
  );
  const breakPoints = SASSvarsToJason(SASSBreakpoints);
  const matchMediaQuery = useMediaQuery({ minWidth: breakPoints['medium'] });

  const setCheckBoxValues = (value, optionValue, action) => {
    console.log('value: ', value, 'optionValue: ', optionValue);

    const valueExist = value.includes(optionValue);

    console.log('valueExist: ', valueExist);
    if (!valueExist) {
      return action([...value, optionValue]);
    } else {
      return action([...value].filter((current) => current !== optionValue));
    }
  };

  const getChecked = (value, optionValue) => value.includes(optionValue);

  return (
    <FormControl classes={{ root: classNames(fieldWrapper, choicesWrapper) }}>
      <Field
        name={fieldName}
        defaultValue={defaultVal}
        validate={validators ? composeValidators(...validators) : () => void 0}
        // type={fieldType === 'radiobutton' ? 'radio' : 'text'}s
      >
        {({ input: { onChange, value, checked, type }, meta }) => {
          const errorMessage = meta.error;
          const error = errorMessage && meta.touched && meta.invalid;
          console.log(
            'radio,  currenValue: ' + value,
            'checked: ',
            checked,
            'fieldType: ',
            fieldType,
            'type: ',
            type
          );
          return (
            <>
              {labelText && (
                <InputLabel
                  shrink
                  disabled={disabled}
                  classes={{
                    root: classNames(fieldLabel, {
                      [fieldLabelHidden]: !matchMediaQuery,
                      [fieldLabelError]: error
                    }),
                    disabled: fieldLabelDisabled,
                    focused: fieldLabelFocused,
                    shrink: fieldLabelShrink
                  }}
                >
                  {labelText}
                </InputLabel>
              )}
              <div className={choicesGrid}>
                {options.map(({ label, value: optionValue }, index) => (
                  <FormControlLabel
                    key={index}
                    label={label}
                    name={fieldName}
                    disabled={disabled}
                    // checked={
                    //   type === 'radiobutton'
                    //     ? value === optionValue
                    //     : getChecked(value, optionValue)
                    // }
                    checked={
                      fieldType === 'radiobutton'
                        ? value === optionValue
                        : getChecked(value, optionValue)
                    }
                    value={optionValue}
                    onChange={
                      fieldType === 'radiobutton'
                        ? onChange
                        : () => {
                            console.log('changing...');
                            setCheckBoxValues(value, optionValue, onChange);
                          }
                    }
                    control={
                      fieldType === 'radiobutton' ? (
                        <Radio
                          className={choiceRadio}
                          // icon={<div className={classNames(choiceIcon)} />}
                          // checkedIcon={
                          //   <div
                          //     className={classNames(
                          //       choiceIcon,
                          //       choiceIconChecked
                          //     )}
                          //   />
                          // }
                        />
                      ) : (
                        <Checkbox
                          className={choiceCheckbox}
                          icon={<div className={classNames(choiceIcon)} />}
                          checkedIcon={
                            <div
                              className={classNames(
                                choiceIcon,
                                choiceIconChecked
                              )}
                            />
                          }
                        />
                      )
                    }
                    classes={{
                      root: choice,
                      label: classNames(choiceLabel, {
                        [choiceLabelChecked]: checked
                      })
                    }}
                  />
                ))}
              </div>

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
            </>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default InputChoiceButton;
