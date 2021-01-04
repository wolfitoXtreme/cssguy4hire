import React from 'react';
import InputTextField from '@app/components/Form/InputTextField/InputTextField';
import { mustNotBeEmpty } from '@app/utils/validators';

const TextAreaFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <h5>Text Area fields</h5>
    <div>
      <InputTextField
        fieldName={'text-area-label' + (disabled ? '-disabled' : '')}
        label={'Text Area label' + (disabled ? ' disabled' : '')}
        placeholder={
          'Placeholder for Text Area with label' + (disabled ? ' disabled' : '')
        }
        fullWidth
        disableAnimation
        validators={[mustNotBeEmpty]}
        multiline
        rows={6}
        disabled={disabled}
      />
      <InputTextField
        fieldName={'text-area-label-animated' + (disabled ? '-disabled' : '')}
        label={'Text Area with label animated' + (disabled ? ' disabled' : '')}
        fullWidth
        validators={[mustNotBeEmpty]}
        multiline
        rows={6}
        disabled={disabled}
      />
    </div>
  </>
);

export default TextAreaFields;
