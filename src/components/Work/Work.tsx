import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';

import Section from '@app/components/Section/Section';

const workProjects: { id: string; title: string }[] = [
  {
    id: 'pokerstars',
    title: 'PokerStars Casino (Flutter Entertainment)'
  },
  {
    id: 'iqos',
    title: 'IQOS (Philip Morris International)'
  },
  {
    id: 'blu',
    title: 'BLU (Imperial Brands)'
  },
  {
    id: 'nexxus',
    title: 'NEXXUS (Uniliever)'
  },
  {
    id: 'vitra',
    title: 'Vitra'
  },
  {
    id: 'fotocasion',
    title: 'Fotocasión'
  },
  {
    id: 'libreria-desnivel',
    title: 'Librería Desnivel'
  },
  {
    id: 'kano-libros',
    title: 'Kano Libros'
  }
];

const Work: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.WORK}
      heading={formatMessage({ id: 'section-work-title' })}
    >
      <article>
        <ul>
          {workProjects.map(({ id, title }, index) => (
            <li key={index}>
              <h4>{title}</h4>
              <h5>{formatMessage({ id: `section-work-system-${id}` })}</h5>
              <p>{formatMessage({ id: `section-work-description-${id}` })}</p>
              <figure>Image</figure>
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
};

export default Work;
