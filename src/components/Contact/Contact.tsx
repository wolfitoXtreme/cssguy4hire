import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';

import Button from '@app/components/Form/Button/Button';
import Section from '@app/components/Section/Section';

const Contact: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.CONTACT}
      heading={formatMessage({ id: 'section-contact-title' })}
    >
      <article>
        <h4>{formatMessage({ id: 'section-contact-sub-title' })}</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: formatMessage({ id: 'section-contact-text' })
          }}
        />
        <Button>{formatMessage({ id: 'section-contact-button-text' })}</Button>
      </article>
    </Section>
  );
};

export default Contact;
