import React from 'react';
import Button from '@app/components/Form/Button/Button';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';
import { useForm } from 'react-final-form';

interface ButtonsInt {
  disabled?: boolean;
}

const Buttons: React.FC<ButtonsInt> = ({ disabled }) => {
  const form = useForm();
  const registeredFieds = form.getRegisteredFields();
  const resetFields = () => {
    registeredFieds.forEach((field) => {
      console.log('field: ', field);
      form.resetFieldState(field);
    });
  };

  return (
    <>
      <h5>Buttons</h5>

      <ButtonGroup>
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
            form?.reset({});
            resetFields();
            // form?.setState({ reset: true });
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
