import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as IconClose } from '@app/assets/icons/icon-close.svg';
import { sections } from '@app/types/types';

import Form from '@app/components/Section/Contact/ContactForm/Form/Form';
import Section from '@app/components/Section/Section';

import { closeButton, closeButtonIcon } from './ContactForm.module.scss';

interface ContactFormInt {
  toggleForm: () => void;
}

const ContactForm = React.forwardRef<HTMLElement, ContactFormInt>(
  ({ toggleForm }, ref) => {
    const { formatMessage } = useIntl();
    const text = formatMessage({ id: 'nav-close' });

    return (
      <Section
        id={sections.CONTACT}
        toggler={false}
        secondaryMenu={false}
        heading={formatMessage({ id: 'section-contact-form-title' })}
        ref={ref}
        variant="static"
      >
        <button
          onClick={() => toggleForm()}
          title={text}
          className={closeButton}
        >
          {text}
          <IconClose className={closeButtonIcon} />
        </button>
        <Form />
      </Section>
    );
  }
);

export default ContactForm;
