import React, { useContext, useEffect, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { TweenLite } from 'gsap';
import { updateDocumentLanguage } from '@app/utils/utils';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import { languageStateType, languages, devices } from '@app/types/types';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import translations from '@app/translations/translations.json';
import Menu from '@app/components/Menu/Menu';
import Home from '@app/components/Home/Home';
import About from '@app/components/About/About';
import Skills from '@app/components/Skills/Skills';
import Roles from '@app/components/Roles/Roles';
import Work from '@app/components/Work/Work';
import Contact from '@app/components/Contact/Contact';
import Footer from '@app/components/Footer/Footer';

import { main, menuWidth } from './Main.module.scss';

interface MainInt {
  lang: languages;
}

const Main: React.FC<MainInt> = ({ lang }) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef(null);
  const menuPositions = {
    main: [parseInt(menuWidth), 0],
    menu: [0, -parseInt(menuWidth)]
  };
  const { type: currentDevice } = useContext(DeviceContext);
  const { menuIsOpen } = useContext(MenuContext);

  useEffect(() => {
    if (currentDevice === devices.MOBILE && menuIsOpen !== null) {
      TweenLite.to([mainRef.current, menuRef.current], {
        duration: menuIsOpen ? 0.5 : 0.35,
        css: {
          right: (index) =>
            index === 0
              ? menuPositions.main[menuIsOpen ? 0 : 1]
              : menuPositions.menu[menuIsOpen ? 0 : 1]
        },
        ease: 'Power2.easeOut'
      });
    }
  }, [currentDevice, menuIsOpen, menuPositions.main, menuPositions.menu]);

  const messages = translations[lang];

  // update languages
  updateDocumentLanguage(lang);

  return (
    <IntlProvider locale={lang} messages={messages}>
      {(currentDevice === devices.MOBILE && (
        <>
          <Menu ref={menuRef} menuType={devices.MOBILE} />
          <main ref={mainRef} className={main}>
            <Home />
            <About />
            <Skills />
            <Roles />
            <Work />
            <Contact />
          </main>
          <Footer />
        </>
      )) || (
        <>
          <main className={main}>
            <Home />
            <About />
            <Skills />
            <Roles />
            <Work />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </IntlProvider>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};
export default connect(mapStateToProps)(Main);
