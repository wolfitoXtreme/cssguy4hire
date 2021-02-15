import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { updateDocumentLanguage } from '@app/utils/utils';
import translations from '@app/translations/translations.json';
import Menu from '@app/components/Menu/Menu';
import Home from '@app/components/Home/Home';
import About from '@app/components/About/About';
import Skills from '@app/components/Skills/Skills';
import Roles from '@app/components/Roles/Roles';
import Work from '@app/components/Work/Work';
import Contact from '@app/components/Contact/Contact';
import {
  DeviceContext
  // device
} from '@app/context/DeviceContext/DeviceContext';
import { stateType, languages, devices } from '@app/types/types';

import { main } from './Main.module.scss';

interface MainInt {
  lang: languages;
}

const Main: React.FC<MainInt> = ({ lang }) => {
  const { type: currentDevice } = useContext(DeviceContext);

  const messages = translations[lang];

  // update languages
  updateDocumentLanguage(lang);

  return (
    <IntlProvider locale={lang} messages={messages}>
      {currentDevice === devices.MOBILE && <Menu menuType={devices.MOBILE} />}
      <main className={main}>
        <h5 style={{ textAlign: 'right' }}>{currentDevice}</h5>
        <Home />
        <About />
        <Skills />
        <Roles />
        <Work />
        <Contact />
      </main>
    </IntlProvider>
  );
};

const mapStateToProps = (state: stateType) => {
  return {
    lang: state.languageReducer.lang
  };
};
export default connect(mapStateToProps)(Main);
