import React from 'react';
import Section from '@app/components/Reference/Section/Section';

import Buttons from './Buttons/Buttons';
import TextFields from './TextFields/TextFields';
import TextAreaFields from './TextAreaFields/TextAreaFields';
import SelectFields from './SelectFields/SelectFields';
import RadioButtons from './RadioButtons/RadioButtons';
import CheckBoxes from './CheckBoxes/CheckBoxes';

const Forms: React.FC = () => {
  return (
    <Section heading="Forms">
      <>
        <form>
          <TextFields />
          <TextAreaFields />
          <SelectFields />
          <RadioButtons />
          <CheckBoxes />
          <Buttons />
        </form>

        <h4>Disabled form</h4>
        <form>
          <TextFields disabled />
          <TextAreaFields disabled />
          <SelectFields disabled />
          <RadioButtons disabled />
          <CheckBoxes disabled />
          <Buttons disabled />
        </form>
      </>
    </Section>
  );
};

export default Forms;
