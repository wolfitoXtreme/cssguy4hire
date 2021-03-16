import React, { useContext } from 'react';

import { devices, sections } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';

import Section from '@app/components/Section/Section';
import Menu from '@app/components/Menu/Menu';

import Heading from './Heading/Heading';

const Home: React.FC = () => {
  const { type: currentDevice } = useContext(DeviceContext);
  return (
    <Section id={sections.HOME}>
      <Heading />
      <p>Home here</p>
      {currentDevice === devices.DESKTOP && <Menu menuType={devices.DESKTOP} />}
    </Section>
  );
};

export default Home;
