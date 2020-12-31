import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';

const CheckBoxes: React.FC<{ disabled?: boolean }> = () => {
  const [checkBoxValue, setCheckboxValue] = useState({
    checkedA: true
  });

  const handleCheckBoxChange = (event) => {
    setCheckboxValue({
      ...checkBoxValue,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <>
      {' '}
      <h5>Check-boxes</h5>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxValue.checkedA}
              onChange={handleCheckBoxChange}
              name="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckBoxChange} name="checkedB" />}
          label="Secondary"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckBoxChange} name="checkedC" />}
          label="Secondary"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleCheckBoxChange} name="checkedD" />}
          label="Secondary"
        />
      </div>
    </>
  );
};

export default CheckBoxes;
