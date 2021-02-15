import React, { useContext } from 'react';
import classNames from 'classnames';
import { sections, devices } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import logo from '@app/assets/images/logo-footer.svg';
import SecondaryMenu from '@app/components/Menu/SecondaryMenu/SecondaryMenu';

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
  const { type: currentDevice } = useContext(DeviceContext);

  const styleClass = (sectionName: sections): string => {
    const isHome = () => homePanel;
    const isAbout = () => aboutPanel;
    const isSkills = () => skillsPanel;
    const isRoles = () => rolesPanel;
    const isWork = () => workPanel;
    const isContact = () => contactPanel;

    const sectionStyles = {
      [sections.HOME]: isHome,
      [sections.ABOUT]: isAbout,
      [sections.ROLES]: isRoles,
      [sections.SKILLS]: isSkills,
      [sections.WORK]: isWork,
      [sections.CONTACT]: isContact
    };

    return sectionStyles[sectionName]
      ? sectionStyles[sectionName]()
      : homePanel;
  };

  return (
    <section
      id={id}
      title={heading}
      className={classNames(panel, styleClass(id))}
    >
      {currentDevice === devices.DESKTOP && <SecondaryMenu />}
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
