import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';

import Section from '@app/components/Section/Section';

const roles: { id: string }[] = [
  { id: '01' },
  { id: '02' },
  { id: '03' },
  { id: '04' },
  { id: '05' },
  { id: '06' },
  { id: '07' },
  { id: '08' },
  { id: '09' }
];

const Roles: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.ROLES}
      heading={formatMessage({ id: 'section-roles-title' })}
    >
      <article>
        <ul className="column-list">
          {roles.map(({ id }, index) => (
            <li key={index} className="column-list-item">
              {formatMessage({ id: `section-roles-text-${id}` })}
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
};

export default Roles;
