import React from 'react';
import { mustNotBeEmpty } from '@app/utils/validators';
import InputField from '@app/components/Form/InputField/InputField';

const TextFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <h5>Text fields</h5>
    <div>
      <>
        <InputField
          type="text"
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
        <InputField
          type="text"
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
