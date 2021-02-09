import React from 'react';
import { sections } from '@app/types/types';
import Section from '@app/components/Section/Section';

const Skills: React.FC = () => (
  <Section id={sections.SKILLS} heading="Skills">
    <article>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
        assumenda magni laboriosam consequatur officiis distinctio omnis quasi
        cumque aut rem?
      </p>
    </article>
  </Section>
);

export default Skills;
