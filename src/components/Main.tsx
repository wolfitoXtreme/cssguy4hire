import React, { useContext, useEffect, useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { gsap } from 'gsap';

import { languageStateType, languages, devices } from '@app/types/types';
import { updateDocumentLanguage } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import translations from '@app/translations/translations.json';

import Panels from '@app/components/Panels/Panels';
import Menu from '@app/components/Menu/Menu';
import Home from '@app/components/Section/Home/Home';
import About from '@app/components/Section/About/About';
import Skills from '@app/components/Section/Skills/Skills';
import Roles from '@app/components/Section/Roles/Roles';
import Work from '@app/components/Section/Work/Work';
import Contact from '@app/components/Section/Contact/Contact';
import Footer from '@app/components/Footer/Footer';

import { main, menuWidth } from './Main.module.scss';

interface MainInt {
  lang: languages;
}

const Main: React.FC<MainInt> = ({ lang }) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef(null);
  const [enableSwiper, setEnableSwiper] = useState(false);

  const { type: currentDevice } = useContext(DeviceContext);
  const {
    menuIsOpen,
    toggleMenu,
    togglingMenu,
    menuIsToggling,
    swiperPanels,
    jumpPanel,
    jumpingPanel
  } = useContext(MenuContext);

  const menuPositions = {
    main: [parseInt(menuWidth), 0],
    menu: [0, -parseInt(menuWidth)]
  };

  const messages = translations[lang];

  useEffect(() => {
    setEnableSwiper(!!menuIsOpen ? false : true);
    if (swiperPanels) {
      swiperPanels.allowSlideNext = enableSwiper;
      swiperPanels.allowSlidePrev = enableSwiper;
    }
  }, [enableSwiper, menuIsOpen, menuIsToggling, swiperPanels]);

  useEffect(() => {
    currentDevice === devices.DESKTOP && menuIsOpen && toggleMenu(false);
  }, [currentDevice, menuIsOpen, toggleMenu]);

  useEffect(() => {
    if (menuIsOpen !== null && menuIsToggling) {
      gsap.to([mainRef.current, menuRef.current], {
        duration: menuIsOpen ? 0.5 : 0.35,
        css: {
          right: (index) =>
            index === 0
              ? menuPositions.main[menuIsOpen ? 0 : 1]
              : menuPositions.menu[menuIsOpen ? 0 : 1]
        },
        ease: 'Power2.easeOut',
        onComplete: () => {
          if (swiperPanels && jumpPanel !== null) {
            jumpingPanel(null);
            swiperPanels.slideTo(jumpPanel);
          }
          togglingMenu(false);
        }
      });
    }
  }, [
    currentDevice,
    menuIsOpen,
    menuPositions.main,
    menuPositions.menu,
    menuIsToggling,
    togglingMenu,
    swiperPanels,
    jumpPanel,
    jumpingPanel
  ]);

  // update languages
  updateDocumentLanguage(lang);

  return (
    <IntlProvider locale={lang} messages={messages}>
      <>
        {currentDevice === devices.MOBILE && (
          <Menu ref={menuRef} menuType={devices.MOBILE} />
        )}
        <main ref={mainRef} className={main}>
          <Panels>
            <Home />
            <About />
            <Skills />
            <Roles />
            <Work />
            <Contact />
          </Panels>
        </main>
        <Footer />
      </>
    </IntlProvider>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};
export default connect(mapStateToProps)(Main);
