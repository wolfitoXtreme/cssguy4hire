import React from 'react';
import { Form } from 'react-final-form';
import Section from '@app/components/Reference/Section/Section';

import Buttons from './Buttons/Buttons';
import TextFields from './TextFields/TextFields';
import TextAreaFields from './TextAreaFields/TextAreaFields';
import SelectFields from './SelectFields/SelectFields';
import RadioButtons from './RadioButtons/RadioButtons';
import CheckBoxes from './CheckBoxes/CheckBoxes';

const Forms: React.FC = () => {
  const onSubmit = () => {
    console.log('...submitting');
  };

  return (
    <Section heading="Forms">
      <>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <TextFields />
              <TextAreaFields />
              <SelectFields />
              {/*<RadioButtons />
              <CheckBoxes /> */}
              <Buttons />
              {/* {JSON.stringify(values, null, 2)} */}
            </form>
          )}
        />

        <h4>Disabled form</h4>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form>
              <TextFields disabled />
              <TextAreaFields disabled />
              <SelectFields disabled />
              {/* <RadioButtons disabled />
              <CheckBoxes disabled /> */}
              <Buttons disabled />
            </form>
          )}
        />
      </>
    </Section>
  );
};

export default Forms;
