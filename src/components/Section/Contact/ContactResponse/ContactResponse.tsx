import React, { useContext, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { sections } from '@app/types/types';
import { ContactFormContext } from '@app/context/ContactFormContext/ContactFormContext';

import Section from '@app/components/Section/Section';

import { serverErrorMessage } from './ContactResponse.module.scss';

const responseDelay = 4500;

interface ContactResponseInt {
  closeButton: React.ReactNode;
  actions: { (): void }[];
}

const ContactResponse = React.forwardRef<HTMLElement, ContactResponseInt>(
  ({ closeButton, actions }, ref) => {
    const { responseMessage } = useContext(ContactFormContext);
    const { formatMessage } = useIntl();

    const runActions = (actions) => {
      actions.map((action) => {
        return action();
      });
    };

    const { message, error } = responseMessage || {};

    useEffect(() => {
      const responseTimeout = setTimeout(() => {
        runActions(actions);
      }, responseDelay);
      return () => clearTimeout(responseTimeout);
    }, [actions]);

    return (
      <Section
        id={sections.CONTACT}
        toggler={false}
        secondaryMenu={false}
        heading={formatMessage({ id: 'section-contact-form-title' })}
        ref={ref}
        variant="static"
      >
        <FormattedMessage
          id="seccess-message"
          defaultMessage={message}
          values={{
            a: (chunks) => (
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  runActions(actions);
                }}
              >
                {chunks}
              </a>
            ),
            b: (chunks) => <b>{chunks}</b>
          }}
        />
        {error && <p className={serverErrorMessage}>({error})</p>}
        {closeButton}
      </Section>
    );
  }
);

export default ContactResponse;
