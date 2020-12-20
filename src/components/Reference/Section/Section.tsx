import React from 'react';
import { block, blockHeading, blockHeadingText } from './Section.module.scss';

interface SectionInt {
  heading: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionInt> = ({ heading, children }) => {
  return (
    <section>
      <h4 className={blockHeading}>
        <span className={blockHeadingText}>{heading}</span>
      </h4>
      <div className={block}>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Section;
