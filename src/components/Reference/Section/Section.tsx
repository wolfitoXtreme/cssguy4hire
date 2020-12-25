import React, { Children } from 'react';

import {
  block,
  blockInner,
  blockHeading,
  blockHeadingText
} from './Section.module.scss';
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
        {children && (
          <>
            {Children.map(children, (child, i) => (
              <div className={blockInner}>{child}</div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Section;
