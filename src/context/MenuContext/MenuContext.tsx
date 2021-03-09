import React, { useState } from 'react';

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
    { id: links.GITHUB, name: 'GitHub', url: 'https://github.com/' },
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
    sections: { id: string }[];
    external: { id: links; name?: string; url?: string }[];
    lang: { id: links };
  };
  menuIsOpen: boolean | null;
  toggle: (...args: any[]) => void;
}>({
  navigation,
  menuIsOpen: null,
  toggle: (open): any => {}
});

export const MenuProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean | null>(null);

  const toggleMenu = (open: boolean) => {
    setOpen(!open);
  };

  return (
    <MenuContext.Provider
      value={{ navigation, menuIsOpen: open, toggle: toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};
