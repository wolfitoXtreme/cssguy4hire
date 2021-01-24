import React from 'react';
import { useForm } from 'react-final-form';
import Button from '@app/components/Form/Button/Button';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';

interface ButtonsInt {
  disabled?: boolean;
  inverted?: boolean;
}

const Buttons: React.FC<ButtonsInt> = ({ disabled, inverted = false }) => {
  const form = useForm();
  const registeredFieds = form.getRegisteredFields();
  const resetFields = () => {
    registeredFieds.forEach((field) => {
      form.resetFieldState(field);
    });
  };

  return (
    <>
      <h5>Buttons</h5>

      <ButtonGroup inverted={inverted}>
        <Button
          type="submit"
          icon="end"
          disabled={disabled}
          onClick={() => form?.submit()}
        >
          Submit
        </Button>
        <Button
          type="reset"
          disabled={disabled}
          onClick={() => {
            resetFields();
            form?.reset();
          }}
        >
          Reset
        </Button>
        <Button
          href="#"
          disabled={disabled}
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Link Button
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Buttons;
