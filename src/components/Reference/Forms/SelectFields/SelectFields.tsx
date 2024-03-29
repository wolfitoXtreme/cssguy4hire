import React from 'react';

import { mustNotBeEmpty } from '@app/utils/validators';

import InputField from '@app/components/Form/InputField/InputField';

const SelectFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const options = [
    {
      value: 'option-a',
      label: 'Option A'
    },
    {
      value: 'option-b',
      label: 'Option B'
    },
    {
      value: 'option-c',
      label: 'Option C'
    },
    {
      value: 'option-d',
      label: 'Option D'
    },
    {
      value: 'option-e',
      label: 'Option E'
    },
    {
      value: 'option-f',
      label: 'Option F'
    },
    {
      value: 'option-g',
      label: 'Option G'
    }
  ];

  return (
    <>
      <h5>Select fields</h5>
      <div>
        <InputField
          type="select"
          fieldName={'select-input-label' + (disabled ? '-disabled' : '')}
          label={'Select Input with label' + (disabled ? '-disabled' : '')}
          defaultOption="Please select an option"
          fullWidth
          options={options}
          disableAnimation
          validators={[mustNotBeEmpty]}
          disabled={disabled}
        />
        <InputField
          type="select"
          fieldName={
            'select-input-label-animated' + (disabled ? '-disabled' : '')
          }
          label={'Please select an option' + (disabled ? '-disabled' : '')}
          defaultOption="Please select an option"
          fullWidth
          options={options}
          validators={[mustNotBeEmpty]}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default SelectFields;
