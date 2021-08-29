import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { devices, sections } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';

import Section from '@app/components/Section/Section';
import Heading from '@app/components/Heading/Heading';
import Menu from '@app/components/Menu/Menu';

import { homeIntro } from './Home.module.scss';

const Home: React.FC = () => {
  const { formatMessage } = useIntl();
  const { type: currentDevice } = useContext(DeviceContext);
  return (
    <Section id={sections.HOME}>
      <Heading />
      <article
        dangerouslySetInnerHTML={{
          __html: formatMessage({ id: 'section-home-text' })
        }}
        className={homeIntro}
      />
      {currentDevice === devices.DESKTOP && <Menu menuType={devices.DESKTOP} />}
    </Section>
  );
};

export default Home;
