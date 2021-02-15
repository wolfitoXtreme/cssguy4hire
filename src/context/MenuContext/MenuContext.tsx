import React from 'react';
import { sections, links } from '@app/types/types';

export const navigation = {
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
    { id: links.BAHANCE, name: 'Bēhance', url: 'https://github.com/' },
    { id: links.CV, url: 'cv_en.pdf' }
  ],
  lang: { id: links.LANG }
};

export const MenuContext = React.createContext<{
  sections: { id: string }[];
  external: { id: links; name?: string; url: string }[];
  lang: { id: links };
}>(navigation);
