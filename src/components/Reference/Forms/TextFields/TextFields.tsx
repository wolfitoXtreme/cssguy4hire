import React from 'react';
import { mustNotBeEmpty } from '@app/utils/validators';
import InputTextField from '@app/components/Form/InputTextField/InputTextField';

const TextFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <h5>Text fields</h5>
    <div>
      <>
        <InputTextField
          fieldName={'text-input-label' + (disabled ? '-disabled' : '')}
          label={'Text Input with label' + (disabled ? '-disabled' : '')}
          placeholder={
            'Placeholder for Text Input with label' +
            (disabled ? '-disabled' : '')
          }
          fullWidth
          disableAnimation
          validators={[mustNotBeEmpty]}
          disabled={disabled}
        />
        <InputTextField
          fieldName={
            'text-input-label-animated' + (disabled ? '-disabled' : '')
          }
          label={
            'Text Input with animated label' + (disabled ? '-disabled' : '')
          }
          fullWidth
          validators={[mustNotBeEmpty]}
          disabled={disabled}
        />
      </>
    </div>
  </>
);

export default TextFields;
