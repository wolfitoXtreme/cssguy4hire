import React from 'react';
import { sections } from '@app/types/types';
import Section from '@app/components/Section/Section';

const Home: React.FC = () => (
  <Section id={sections.HOME}>
    <p>Home here</p>
  </Section>
);

export default Home;
