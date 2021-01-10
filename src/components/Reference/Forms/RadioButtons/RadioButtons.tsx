import React from 'react';
import { mustNotBeEmpty } from '@app/utils/validators';
import InputChoiceButton from '@app/components/Form/InputChoiceButton/InputChoiceButton';

const fieldName = 'radio-input';

const RadioButtons: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const options = [
    {
      value: 'RadioButtonA-value',
      label: 'Radio Button field A'
    },
    {
      value: 'RadioButtonB-value',
      label: 'Radio Button field B'
    },
    {
      value: 'RadioButtonC-value',
      label: 'Radio Button field C'
    }
  ];

  return (
    <>
      <h5>Radio buttons</h5>
      <div>
        <InputChoiceButton
          type="radiobutton"
          label="Radio buttons with label"
          fieldName={fieldName}
          options={options}
          defaultValue={options[0].value}
          validators={[mustNotBeEmpty]}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default RadioButtons;
