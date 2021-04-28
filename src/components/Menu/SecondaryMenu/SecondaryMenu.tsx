import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { getNoTouch } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import { languageStateType, devices, links } from '@app/types/types';

import IconMenu from '../IconMenu/IconMenu';
import MenuLang from '../MenuLang/MenuLang';

import {
  menu,
  menuHeading,
  menuList,
  menuListItem,
  menuListItemLink,
  menuListItemIcon,
  noTouchEvents,
  menuUtil,
  menuUtilMaintenance,
  menuUtilInternal,
  menuUtilList,
  menuUtilLangList,
  menuUtilItem,
  menuUtilItemLink,
  menuUtilItemIcon,
  menuContact,
  menuContactList,
  menuContactItem,
  menuContactItemLink,
  menuContactItemIcon
} from '@app/components/Menu/Menu.module.scss';

interface SecondaryMenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
  variant?: 'internal' | 'maintenance' | 'contact';
  lang: string;
  children?: React.ReactNode;
}

const SecondaryMenu: React.FC<SecondaryMenuInt> = ({
  menuType,
  variant,
  children,
  lang
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: { external: menuItems }
  } = useContext(MenuContext);
  const { toggleMenu, menuIsOpen } = useContext(MenuContext);

  const showLang = variant !== 'maintenance' && variant !== 'contact';

  return (
    <>
      <nav
        className={classNames({
          [menu]: menuType === devices.MOBILE,
          [menuUtil]: menuType === devices.DESKTOP,
          [menuUtilInternal]:
            menuType === devices.DESKTOP && variant === 'internal',
          [menuContact]: variant === 'contact',
          [menuUtilInternal + ' ' + menuUtilMaintenance]:
            menuType === devices.DESKTOP && variant === 'maintenance'
        })}
      >
        <ul
          className={classNames({
            [menuList]: menuType === devices.MOBILE && variant !== 'contact',
            [menuUtilList]:
              menuType === devices.DESKTOP && variant !== 'contact',
            [menuContactList]: variant === 'contact'
          })}
        >
          {menuItems?.map(({ id, name, url }, index) => {
            const text = name || formatMessage({ id: `menu-${id}` });

            return (
              <li
                key={index}
                className={classNames({
                  [menuListItem]:
                    menuType === devices.MOBILE && variant !== 'contact',
                  [menuUtilItem]:
                    menuType === devices.DESKTOP && variant !== 'contact',
                  [menuContactItem]: variant === 'contact'
                })}
              >
                <a
                  href={id !== links.CV ? url : `/cv/cv-${lang}.pdf`}
                  title={text}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={-1}
                  onClick={() =>
                    menuType === devices.MOBILE && toggleMenu(!menuIsOpen)
                  }
                  className={classNames({
                    [menuListItemLink]:
                      menuType === devices.MOBILE && variant !== 'contact',
                    [menuUtilItemLink]:
                      menuType === devices.DESKTOP && variant !== 'contact',
                    [menuContactItemLink]: variant === 'contact',
                    [noTouchEvents]: getNoTouch()
                  })}
                >
                  <IconMenu
                    icon={variant !== 'contact' ? id : `${id}-inv`}
                    className={classNames({
                      [menuListItemIcon]:
                        menuType === devices.MOBILE && variant !== 'contact',
                      [menuUtilItemIcon]:
                        menuType === devices.DESKTOP && variant !== 'contact',
                      [menuContactItemIcon]: variant === 'contact'
                    })}
                  />
                  <span>{text}</span>
                </a>
              </li>
            );
          })}
        </ul>
        {showLang && (
          <MenuLang
            heading={formatMessage({ id: 'menu-title-lang' })}
            styleClasses={{
              heading: menuHeading,
              list: classNames({
                [menuList]: menuType === devices.MOBILE,
                [menuUtilList]: menuType === devices.DESKTOP,
                [menuUtilLangList]: menuType === devices.DESKTOP
              }),
              listItem: classNames({
                [menuListItem]: menuType === devices.MOBILE,
                [menuUtilItem]: menuType === devices.DESKTOP
              }),
              anchor: classNames({
                [menuListItemLink]: menuType === devices.MOBILE,
                [menuUtilItemLink]: menuType === devices.DESKTOP,
                [noTouchEvents]: getNoTouch()
              }),
              icon:
                menuType === devices.MOBILE
                  ? menuListItemIcon
                  : menuUtilItemIcon
            }}
            closeMobileMenu={() =>
              menuType === devices.MOBILE && toggleMenu(!menuIsOpen)
            }
          />
        )}
        {children && children}
      </nav>
    </>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};

export default connect(mapStateToProps)(SecondaryMenu);
