import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';

import Section from '@app/components/Section/Section';

import { aboutContent, aboutDisposable } from './About.module.scss';

const About: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.ABOUT}
      heading={formatMessage({ id: 'section-about-title' })}
    >
      <article className={aboutContent}>
        <p
          dangerouslySetInnerHTML={{
            __html: formatMessage({ id: 'section-about-text-01' })
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: formatMessage({ id: 'section-about-text-02' })
          }}
          className={aboutDisposable}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: formatMessage({ id: 'section-about-text-03' })
          }}
          className={aboutDisposable}
        />
      </article>
    </Section>
  );
};

export default About;
