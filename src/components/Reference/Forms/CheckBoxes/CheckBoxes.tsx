import React from 'react';
import { mustNotBeEmpty } from '@app/utils/validators';
import InputChoiceButton from '@app/components/Form/InputChoiceButton/InputChoiceButton';

const fieldName = 'check-box-input';

const CheckBoxes: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const options = [
    {
      value: 'CheckBoxA-value',
      label: 'Check Box field A'
    },
    {
      value: 'CheckBoxB-value',
      label: 'Check Box field B'
    },
    {
      value: 'CheckBoxC-value',
      label: 'Check Box field C'
    }
  ];

  return (
    <>
      <h5>Checkboxes</h5>
      <div>
        <InputChoiceButton
          type="checkbox"
          fieldName={fieldName + (disabled ? '-disabled' : '')}
          label={'Checkboxes with label' + (disabled ? ' disabled' : '')}
          options={options}
          validators={[mustNotBeEmpty]}
          defaultValue={options[0].value}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default CheckBoxes;
