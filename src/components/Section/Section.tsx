import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections, devices } from '@app/types/types';
import { DeviceContext } from '@app/context/DeviceContext/DeviceContext';
import logo from '@app/assets/images/logo-footer.svg';
import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';

import MenuToggler from '@app/components/Menu/MenuToggler/MenuToggler';
import SecondaryMenu from '@app/components/Menu/SecondaryMenu/SecondaryMenu';

import {
  section,
  sectionStatic,
  sectionNavDisabled,
  sectionDetail,
  sectionDetailInner,
  sectionDetailWide,
  sectionDetailStatic,
  sectionHeading,
  sectionHeadingWide,
  sectionFooterSignature,
  sectionFooterImg,
  homeSection,
  aboutSection,
  skillsSection,
  rolesSection,
  workSection,
  contactSection
} from './Section.module.scss';

interface SectionInt {
  id: sections;
  heading?: string;
  children?: React.ReactNode;
  variant?: 'wide' | 'static';
  toggler?: boolean;
  secondaryMenu?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionInt>(
  (
    { id, heading, children, variant, toggler = true, secondaryMenu = true },
    ref
  ) => {
    const { formatMessage } = useIntl();
    const { type: currentDevice } = useContext(DeviceContext);
    const { menuIsOpen, staticContent } = useContext(NavigationContext);

    const sectionClassName = (sectionName: sections): string => {
      const isHome = () => homeSection;
      const isAbout = () => aboutSection;
      const isSkills = () => skillsSection;
      const isRoles = () => rolesSection;
      const isWork = () => workSection;
      const isContact = () => contactSection;

      const setClassName = {
        [sections.HOME]: isHome,
        [sections.ABOUT]: isAbout,
        [sections.ROLES]: isRoles,
        [sections.SKILLS]: isSkills,
        [sections.WORK]: isWork,
        [sections.CONTACT]: isContact
      };

      return setClassName[sectionName]
        ? setClassName[sectionName]()
        : homeSection;
    };

    return (
      <section
        id={id}
        ref={ref}
        title={heading}
        className={classNames(section, sectionClassName(id), {
          [sectionNavDisabled]: menuIsOpen,
          [sectionStatic]: staticContent
        })}
      >
        {currentDevice === devices.DESKTOP && secondaryMenu && (
          <SecondaryMenu
            menuType={devices.DESKTOP}
            variant={id !== sections.HOME ? 'internal' : undefined}
          />
        )}
        {currentDevice === devices.MOBILE && toggler && <MenuToggler />}
        <div
          className={classNames(sectionDetail, {
            [sectionDetailWide]: variant === 'wide',
            [sectionDetailStatic]: staticContent
          })}
        >
          <div className={sectionDetailInner}>
            {heading && (
              <h2
                className={classNames(sectionHeading, {
                  [sectionHeadingWide]: variant === 'wide'
                })}
              >
                {heading}
              </h2>
            )}
            {children}
          </div>
        </div>
        {id !== sections.HOME && (
          <div className={sectionFooterSignature}>
            <h6>
              <div>
                <img
                  className={sectionFooterImg}
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
  }
);

export default Section;
