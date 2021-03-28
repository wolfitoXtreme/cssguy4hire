import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections, devices } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import logo from '@app/assets/images/logo-footer.svg';

import MenuToggler from '@app/components/Menu/MenuToggler/MenuToggler';
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
  const { formatMessage } = useIntl();
  const { type: currentDevice } = useContext(DeviceContext);

  const sectionClassName = (sectionName: sections): string => {
    const isHome = () => homePanel;
    const isAbout = () => aboutPanel;
    const isSkills = () => skillsPanel;
    const isRoles = () => rolesPanel;
    const isWork = () => workPanel;
    const isContact = () => contactPanel;

    const setClassName = {
      [sections.HOME]: isHome,
      [sections.ABOUT]: isAbout,
      [sections.ROLES]: isRoles,
      [sections.SKILLS]: isSkills,
      [sections.WORK]: isWork,
      [sections.CONTACT]: isContact
    };

    return setClassName[sectionName] ? setClassName[sectionName]() : homePanel;
  };

  return (
    <section
      id={id}
      title={heading}
      className={classNames(panel, sectionClassName(id))}
    >
      {currentDevice === devices.DESKTOP && (
        <SecondaryMenu
          menuType={devices.DESKTOP}
          variant={id !== sections.HOME ? 'internal' : undefined}
        />
      )}
      {currentDevice === devices.MOBILE && <MenuToggler />}
      <div className={panelDetail}>
        {heading && <h2>{heading}</h2>}
        {children}
      </div>
      {id !== sections.HOME && (
        <div className={panelFooterSignature}>
          <h6>
            <div>
              <img
                className={panelFooterImg}
                src={logo}
                alt={formatMessage({ id: 'site' })}
              />
            </div>
            <span className="hidden">{formatMessage({ id: 'site' })}</span>
          </h6>
        </div>
      )}
    </section>
  );
};

export default Section;
