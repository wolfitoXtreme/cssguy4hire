import React, { useState } from 'react';
import FieldText from '@app/components/Form/FieldText/FieldText';
import MenuItem from '@material-ui/core/MenuItem';

const SelectFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (event) => {
    console.log('event.target.value: ', event.target.value);
    setSelectValue(event.target.value);
  };

  const options = [
    {
      value: '',
      label: 'Choose an option'
    },
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
        <FieldText
          id={'select-input-field' + (disabled ? '-disabled' : '')}
          placeholder={
            'Select field placeholder' + (disabled ? ' disabled' : '')
          }
          fullWidth
          shrink
          select
          label={'Select field label' + (disabled ? ' disabled' : '')}
          value={selectValue}
          onChange={handleSelectChange}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </FieldText>
      </div>
    </>
  );
};

export default SelectFields;
