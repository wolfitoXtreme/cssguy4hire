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
    { id: links.LINKEDIN, name: 'LinkedIn', url: 'https://github.com/' },
    { id: links.CODEPEN, name: 'CodePen', url: 'https://github.com/' },
    {
      id: links.STACKOVERFLOW,
      name: 'Stack Overflow',
      url: 'https://github.com/'
    },
    { id: links.BEHANCE, name: 'Bēhance', url: 'https://github.com/' },
    { id: links.CV, url: 'cv_en.pdf' }
  ],
  lang: { id: links.LANG }
};

export const MenuContext = React.createContext<{
  navigation: {
    sections: { id: string }[];
    external: { id: links; name?: string; url: string }[];
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
    console.log('toggling...');
    setOpen(!open);
  };

  console.log('...is open...', !!open);

  return (
    <MenuContext.Provider
      value={{ navigation, menuIsOpen: open, toggle: toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};
