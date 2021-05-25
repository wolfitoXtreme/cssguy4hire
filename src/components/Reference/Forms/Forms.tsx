import React from 'react';
import { Form } from 'react-final-form';

import Section from '@app/components/Reference/Section/Section';

import Buttons from './Buttons/Buttons';
import TextFields from './TextFields/TextFields';
import TextAreaFields from './TextAreaFields/TextAreaFields';
import SelectFields from './SelectFields/SelectFields';
import RadioButtons from './RadioButtons/RadioButtons';
import CheckBoxes from './CheckBoxes/CheckBoxes';

import { form, formValues } from './Forms.module.scss';

const Forms: React.FC = () => {
  const onSubmit = () => {
    console.log('...submitting');
  };

  return (
    <Section heading="Forms">
      <>
        <h4>Form</h4>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate className={form}>
              <TextFields />
              <TextAreaFields />
              <SelectFields />
              <RadioButtons />
              <CheckBoxes />
              <Buttons />
              <pre className={formValues}>
                {JSON.stringify(values, null, 2)}
              </pre>
            </form>
          )}
        />

        <h4>Disabled form</h4>
        <Form
          onSubmit={onSubmit}
          render={() => (
            <form className={form}>
              <TextFields disabled />
              <TextAreaFields disabled />
              <SelectFields disabled />
              <RadioButtons disabled />
              <CheckBoxes disabled />
              <Buttons disabled />
            </form>
          )}
        />
      </>
    </Section>
  );
};

export default Forms;
