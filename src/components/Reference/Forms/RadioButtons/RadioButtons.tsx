import React, { useState } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';

const RadioButtons: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const [radioValue, setRadioValue] = useState('a');

  const handleRadioChange = (event) => {
    console.log('event.target.value: ', event.target.value);
    setRadioValue(event.target.value);
  };
  return (
    <>
      <h5>Radio buttons</h5>
      <div>
        <FormControlLabel
          value="female"
          control={
            <Radio
              name="radio-button"
              value="a"
              checked={radioValue === 'a'}
              onChange={handleRadioChange}
            />
          }
          label="Female"
        />
        <FormControlLabel
          value="male"
          control={
            <Radio
              name="radio-button"
              value="b"
              checked={radioValue === 'b'}
              onChange={handleRadioChange}
            />
          }
          label="Male"
        />
        <FormControlLabel
          value="other"
          control={
            <Radio
              name="radio-button"
              value="c"
              checked={radioValue === 'c'}
              onChange={handleRadioChange}
            />
          }
          label="Other"
        />
        <FormControlLabel
          value="disabled"
          disabled
          control={
            <Radio
              name="radio-button"
              value="d"
              checked={radioValue === 'ad'}
              onChange={handleRadioChange}
            />
          }
          label="(Disabled option)"
        />
      </div>
    </>
  );
};

export default RadioButtons;
