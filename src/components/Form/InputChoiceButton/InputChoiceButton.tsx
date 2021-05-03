import React, { useContext, useState } from 'react';
import { Field } from 'react-final-form';

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
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import { devices } from '@app/types/types';

import {
  fieldWrapper,
  fieldLabel,
  fieldLabelDisabled,
  fieldLabelError,
  fieldLabelFocused,
  fieldLabelShrink,
  fieldLabelHidden,
  helper,
  helperError,
  helperHidden
} from '@app/components/Form/InputField/InputField.module.scss';

import {
  choicesWrapper,
  choicesLabel,
  choice,
  choiceError,
  choiceDisabled,
  choiceLabel,
  choiceLabelChecked,
  choiceLabelDisabled,
  choiceRadio,
  choiceIcon,
  choiceIconChecked,
  choiceCheckbox
} from './InputChoiceButton.module.scss';

interface InputChoiceButtonInt {
  type: 'radio' | 'checkbox';
  label?: string;
  fieldName: string;
  options: {
    label: string;
    value: any;
  }[];
  defaultValue?: any;
  disabled?: boolean;
  validators?: { (...args: any[]): void }[];
  showErrors?: boolean;
}

const InputChoiceButton: React.FC<InputChoiceButtonInt> = ({
  type,
  label: labelText,
  fieldName,
  options,
  defaultValue,
  disabled,
  validators,
  showErrors = true
}) => {
  const { type: currentDevice } = useContext(DeviceContext);
  const [optionDefaultValue] = useState<any[]>(
    defaultValue && type === 'checkbox' ? [defaultValue] : defaultValue
  );

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <>
      <FormControl classes={{ root: classNames(fieldWrapper) }}>
        {labelText && (
          <InputLabel
            shrink
            disabled={disabled}
            classes={{
              root: classNames(fieldLabel, choicesLabel, {
                [fieldLabelHidden]: currentDevice === devices.MOBILE,
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
        <div className={choicesWrapper}>
          {options.map(({ label: optionLabel, value: optionValue }, index) => (
            <Field
              key={index}
              name={fieldName}
              value={optionValue}
              defaultValue={optionDefaultValue}
              validate={
                validators ? composeValidators(...validators) : () => void 0
              }
              type={type}
            >
              {({ input: { onChange, value, checked, type }, meta }) => {
                setErrorMessage(meta.error);
                setError(meta.error && meta.touched && meta.invalid);

                return (
                  <>
                    <FormControlLabel
                      label={optionLabel}
                      name={fieldName}
                      disabled={disabled}
                      checked={checked}
                      value={optionValue}
                      onChange={onChange}
                      control={
                        type === 'radio' ? (
                          <Radio
                            className={choiceRadio}
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
                        root: classNames(choice, {
                          [choiceDisabled]: disabled,
                          [choiceError]: error
                        }),
                        label: classNames(choiceLabel, {
                          [choiceLabelChecked]: checked,
                          [choiceLabelDisabled]: disabled
                        })
                      }}
                    />
                  </>
                );
              }}
            </Field>
          ))}
        </div>
        {showErrors && error && (
          <FormHelperText
            error={error}
            classes={{
              root: classNames(helper, {
                [helperHidden]: currentDevice === devices.MOBILE
              }),
              error: helperError
            }}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default InputChoiceButton;
