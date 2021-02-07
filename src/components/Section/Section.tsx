import React from 'react';

import { panel, panelDetail } from './Section.module.scss';
interface SectionInt {
  id: string;
  heading?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionInt> = ({ id, heading, children }) => {
  return (
    <section id={id} className={panel}>
      <div className={panelDetail}>
        {heading && <h2>{heading}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;
