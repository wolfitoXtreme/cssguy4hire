import React from 'react';
import Button from '@app/components/Form/Button/Button';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';

const Buttons: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <>
    <h5>Buttons</h5>

    <ButtonGroup>
      <Button icon="end" disabled={disabled}>
        Submit
      </Button>
      <Button type="reset" disabled={disabled}>
        Reset
      </Button>
      <Button href="http://google.com/" disabled={disabled}>
        Link Button
      </Button>
    </ButtonGroup>
  </>
);

export default Buttons;
