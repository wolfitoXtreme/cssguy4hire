import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { getNoTouch } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import { devices, sections } from '@app/types/types';

import IconMenu from '../IconMenu/IconMenu';

import {
  menu,
  menuHeading,
  menuList,
  menuListItem,
  menuListItemHome,
  menuListItemAbout,
  menuListItemRoles,
  menuListItemSkills,
  menuListItemWork,
  menuListItemContact,
  menuListItemActive,
  menuListItemLink,
  noTouchEvents,
  menuMain,
  menuMainList,
  menuMainItem,
  menuMainItemLink,
  menuMainItemIcon
} from '@app/components/Menu/Menu.module.scss';

const PrimaryMenu: React.FC<{ menuType: devices.MOBILE | devices.DESKTOP }> = ({
  menuType
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: { sections: menuItems },
    currentPanel,
    jumpingPanel
  } = useContext(MenuContext);

  const sectionClassName = (sectionName: sections): string => {
    const isHome = () => menuListItemHome;
    const isAbout = () => menuListItemAbout;
    const isSkills = () => menuListItemSkills;
    const isRoles = () => menuListItemRoles;
    const isWork = () => menuListItemWork;
    const isContact = () => menuListItemContact;

    const setClassName = {
      [sections.HOME]: isHome,
      [sections.ABOUT]: isAbout,
      [sections.ROLES]: isRoles,
      [sections.SKILLS]: isSkills,
      [sections.WORK]: isWork,
      [sections.CONTACT]: isContact
    };

    return setClassName[sectionName] ? setClassName[sectionName]() : '';
  };

  return (
    <nav className={menuType === devices.MOBILE ? menu : menuMain}>
      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-primary' })}:
      </h5>
      <ul className={menuType === devices.MOBILE ? menuList : menuMainList}>
        {menuItems?.map(({ id }, index) => {
          const text = formatMessage({ id: `menu-${id}` });

          return (
            <React.Fragment key={index}>
              {(menuType === devices.DESKTOP && id !== sections.HOME && (
                <li className={menuMainItem}>
                  <a
                    href={`#${id}`}
                    title={text}
                    tabIndex={-1}
                    className={classNames(menuMainItemLink, {
                      [noTouchEvents]: getNoTouch()
                    })}
                  >
                    <IconMenu icon={id} className={menuMainItemIcon} />
                    <strong>{text}</strong>
                  </a>
                </li>
              )) ||
                (menuType === devices.MOBILE && (
                  <li
                    className={classNames(menuListItem, sectionClassName(id), {
                      [menuListItemActive]: currentPanel === index
                    })}
                  >
                    <a
                      href={`#${id}`}
                      title={text}
                      tabIndex={-1}
                      onClick={(event) => {
                        event.preventDefault();
                        jumpingPanel(index);
                      }}
                      className={classNames(menuListItemLink, {
                        [noTouchEvents]: getNoTouch()
                      })}
                    >
                      <strong>{text}</strong>
                    </a>
                  </li>
                ))}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default PrimaryMenu;
