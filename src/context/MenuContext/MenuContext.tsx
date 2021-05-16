import React, { useCallback, useEffect, useState } from 'react';

import SwiperCore from 'swiper';

import { sections, links } from '@app/types/types';

const navigation = {
  sections: [
    { id: sections.HOME },
    { id: sections.ABOUT },
    { id: sections.SKILLS },
    { id: sections.ROLES },
    { id: sections.WORK },
    { id: sections.CONTACT }
  ],
  external: [
    {
      id: links.GITHUB,
      name: 'GitHub',
      url: 'https://github.com/wolfitoXtreme/'
    },
    {
      id: links.LINKEDIN,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/cesar-candela-86525437/'
    },
    {
      id: links.CODEPEN,
      name: 'CodePen',
      url: 'https://codepen.io/wolfitoXtreme'
    },
    {
      id: links.STACKOVERFLOW,
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/1364026/wolfitoxtreme'
    },
    {
      id: links.BEHANCE,
      name: 'Bēhance',
      url: 'https://www.behance.net/cssguy4hire/'
    },
    { id: links.CV }
  ],
  lang: { id: links.LANG }
};

export const MenuContext = React.createContext<{
  navigation: {
    sections: { id: sections }[];
    external: { id: links; name?: string; url?: string }[];
    lang: { id: links };
  };
  toggleMenu: (x: boolean | null) => void;
  menuIsOpen: boolean | null;
  togglingMenu: (x: boolean) => void;
  menuIsToggling: boolean;
  activePanel: number | null;
  setActivePanel: (x: number | null) => void;
  currentPanel: number;
  changePanel: (x: number) => void;
  jumpPanel: number | null;
  jumpingPanel: (x: number | null) => void;
  swiperPanels: SwiperCore | null;
  setSwiperPanels: (x: SwiperCore) => void;
  setEnablePanels: (x: boolean) => void;
}>({
  navigation,
  toggleMenu: () => {},
  menuIsOpen: null,
  togglingMenu: (menuIsToggling) => menuIsToggling,
  menuIsToggling: false,
  activePanel: null,
  setActivePanel: (panel) => panel,
  currentPanel: 0,
  changePanel: (panel) => panel,
  jumpPanel: null,
  jumpingPanel: (panel) => panel,
  swiperPanels: null,
  setSwiperPanels: (swiper) => swiper,
  setEnablePanels: (enablePanels) => enablePanels
});

export const MenuProvider: React.FC = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean | null>(null);
  const [menuIsToggling, setMenuIsToggling] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [currentPanel, setCurrentPanel] = useState<number>(0);
  const [jumpPanel, setJumpPanel] = useState<number | null>(null);
  const [swiperPanels, setSwiperPanels] = useState<SwiperCore | null>(null);
  const [enablePanels, setEnablePanels] = useState(true);

  const toggleMenu = (open: boolean | null) => {
    togglingMenu(true);
    setMenuIsOpen(open);
    setEnablePanels(true);
  };

  useEffect(() => {
    if (swiperPanels) {
      swiperPanels.allowSlideNext = enablePanels;
      swiperPanels.allowSlidePrev = enablePanels;
      swiperPanels.allowTouchMove = enablePanels;
    }
  }, [enablePanels, swiperPanels]);

  const togglingMenu = (menuIsToggling: boolean) =>
    setMenuIsToggling(menuIsToggling);

  const changePanel = useCallback((panelIndex: number) => {
    setCurrentPanel(panelIndex);
  }, []);

  const initSwiperPanels = (swiper: SwiperCore) => setSwiperPanels(swiper);

  const jumpingPanel = (panel: number | null) => {
    togglingMenu(true);
    setMenuIsOpen(false);
    setJumpPanel(panel);
    setEnablePanels(true);
  };

  return (
    <MenuContext.Provider
      value={{
        navigation,
        toggleMenu,
        menuIsOpen,
        togglingMenu,
        menuIsToggling,
        activePanel,
        setActivePanel,
        currentPanel,
        changePanel,
        jumpPanel,
        jumpingPanel,
        swiperPanels,
        setSwiperPanels: initSwiperPanels,
        setEnablePanels
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
