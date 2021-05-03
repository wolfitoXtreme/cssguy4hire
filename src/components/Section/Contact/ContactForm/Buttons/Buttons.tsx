import React from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-final-form';

import Button from '@app/components/Form/Button/Button';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';

const Buttons = () => {
  const { formatMessage } = useIntl();
  const form = useForm();
  const registeredFieds = form.getRegisteredFields();
  const resetFields = () => {
    registeredFieds.forEach((field) => {
      form.resetFieldState(field);
    });
  };

  return (
    <ButtonGroup>
      <Button
        type="reset"
        onClick={() => {
          resetFields();
          form?.reset();
        }}
      >
        {formatMessage({ id: 'contact-form-button-reset' })}
      </Button>
      <Button type="submit" icon="end" onClick={() => form?.submit()}>
        {formatMessage({ id: 'contact-form-button-send' })}
      </Button>
    </ButtonGroup>
  );
};

export default Buttons;
