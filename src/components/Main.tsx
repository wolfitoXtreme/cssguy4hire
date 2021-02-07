import React from 'react';
import Home from '@app/components/Home/Home';
import About from '@app/components/About/About';
import Skills from '@app/components/Skills/Skills';
import Roles from '@app/components/Roles/Roles';
import Work from '@app/components/Work/Work';
import Contact from '@app/components/Contact/Contact';

import { main } from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={main}>
      <Home />
      <About />
      <Skills />
      <Roles />
      <Work />
      <Contact />
    </main>
  );
};

export default Main;
