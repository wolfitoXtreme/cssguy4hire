import React from 'react';
import FieldText from '@app/components/Form/FieldText/FieldText';

const TextAreaFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <div>
      <FieldText
        id={'text-area-field' + (disabled ? '-disabled' : '')}
        placeholder={
          'Text Area Input Placeholder' + (disabled ? ' disabled' : '')
        }
        fullWidth
        shrink
        label={'Text Area Input Label' + (disabled ? ' disabled' : '')}
        multiline
        rows={6}
        disabled={disabled}
      />
    </div>
  </>
);

export default TextAreaFields;
