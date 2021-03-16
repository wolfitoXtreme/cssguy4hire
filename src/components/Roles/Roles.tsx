import React from 'react';

import { sections } from '@app/types/types';

import Section from '@app/components/Section/Section';

const Roles: React.FC = () => (
  <Section id={sections.ROLES} heading="Roles">
    <article>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
        assumenda magni laboriosam consequatur officiis distinctio omnis quasi
        cumque aut rem?
      </p>
    </article>
  </Section>
);

export default Roles;
