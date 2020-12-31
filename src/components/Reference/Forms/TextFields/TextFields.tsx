import React from 'react';
import FieldText from '@app/components/Form/FieldText/FieldText';

const TextFields: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <h5>Text fields</h5>
    <div>
      {(disabled && (
        <FieldText
          id="text-input-label-disabled"
          placeholder="Text Input with label disabled"
          fullWidth
          shrink
          label="Text Input disabled"
          disabled
        />
      )) || (
        <>
          <FieldText placeholder="Text Input" id="text-input" fullWidth />
          <FieldText
            id="text-input-label"
            placeholder="Text Input with label"
            fullWidth
            shrink
            label="Text Input"
          />
          <FieldText
            id="text-input-label-animated"
            fullWidth
            label="Text Input with animated label"
          />
        </>
      )}
    </div>
  </>
);

export default TextFields;
