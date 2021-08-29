import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';

import Form from '@app/components/Section/Contact/ContactForm/Form/Form';
import Section from '@app/components/Section/Section';

interface ContactFormInt {
  closeButton: React.ReactNode;
}

const ContactForm = React.forwardRef<HTMLElement, ContactFormInt>(
  ({ closeButton }, ref) => {
    const { formatMessage } = useIntl();

    return (
      <Section
        id={sections.CONTACT}
        toggler={false}
        secondaryMenu={false}
        heading={formatMessage({ id: 'section-contact-form-title' })}
        ref={ref}
        variant="static"
      >
        <Form />
        {closeButton}
      </Section>
    );
  }
);

export default ContactForm;
