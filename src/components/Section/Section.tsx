import React from 'react';
import classNames from 'classnames';
import { sections } from '@app/types/types';
import logo from '@app/assets/images/logo-footer.svg';

import {
  panel,
  panelDetail,
  panelFooterSignature,
  panelFooterImg,
  homePanel,
  aboutPanel,
  skillsPanel,
  rolesPanel,
  workPanel,
  contactPanel
} from './Section.module.scss';

interface SectionInt {
  id: sections;
  heading?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionInt> = ({ id, heading, children }) => {
  const styleClass = (sectionName) => {
    const isHome = () => homePanel;
    const isAbout = () => aboutPanel;
    const isSkills = () => skillsPanel;
    const isRoles = () => rolesPanel;
    const isWork = () => workPanel;
    const isContact = () => contactPanel;

    const sectionColors = {
      [sections.HOME]: isHome,
      [sections.ABOUT]: isAbout,
      [sections.ROLES]: isRoles,
      [sections.SKILLS]: isSkills,
      [sections.WORK]: isWork,
      [sections.CONTACT]: isContact
    };

    return sectionColors[sectionName]
      ? sectionColors[sectionName]()
      : contactPanel;
  };

  return (
    <section
      id={id}
      title={heading}
      className={classNames(panel, styleClass(id))}
    >
      <div className={panelDetail}>
        {heading && <h2>{heading}</h2>}
        {children}
      </div>
      <div className={panelFooterSignature}>
        <h6>
          <div>
            <img className={panelFooterImg} src={logo} alt="{CSS} Guy4Hire" />
          </div>
          <span className="hidden">'{'CSS'}'Guy4Hire</span>
        </h6>
      </div>
    </section>
  );
};

export default Section;
