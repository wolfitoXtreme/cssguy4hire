import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as IconClose } from '@app/assets/icons/icon-close.svg';
import { sections } from '@app/types/types';

import Section from '@app/components/Section/Section';

import {
  closeButton,
  closeButtonIcon,
  contactForm
} from './ContactForm.module.scss';

interface ContactFormInt {
  toggleForm: () => void;
}

const ContactForm = React.forwardRef<HTMLElement, ContactFormInt>(
  ({ toggleForm }, ref) => {
    const { formatMessage } = useIntl();
    const text = formatMessage({ id: 'nav-close' });

    return (
      <Section
        className={contactForm}
        id={sections.CONTACT}
        toggler={false}
        secondaryMenu={false}
        heading={formatMessage({ id: 'section-contact-form-title' })}
        ref={ref}
      >
        <button
          onClick={() => toggleForm()}
          title={text}
          className={closeButton}
        >
          {text}
          <IconClose className={closeButtonIcon} />
        </button>
      </Section>
    );
  }
);

export default ContactForm;
