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
  menuListItemIcon,
  menuListItemLink,
  noTouchEvents,
  menuUtil,
  menuUtilMaintenance,
  menuUtilInternal,
  menuUtilList,
  menuUtilLangList,
  menuUtilItem,
  menuUtilItemLink,
  menuUtilItemIcon
} from '@app/components/Menu/Menu.module.scss';

interface SecondaryMenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
  variant?: 'internal' | 'maintenance';
  lang: string;
}

const SecondaryMenu: React.FC<SecondaryMenuInt> = ({
  menuType,
  variant,
  lang
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: { external: menuItems }
  } = useContext(MenuContext);

  return (
    <nav
      className={classNames({
        [menu]: menuType === devices.MOBILE,
        [menuUtil]: menuType === devices.DESKTOP,
        [menuUtilInternal]:
          menuType === devices.DESKTOP && variant === 'internal',
        [menuUtilInternal + ' ' + menuUtilMaintenance]:
          menuType === devices.DESKTOP && variant === 'maintenance'
      })}
    >
      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-secondary' })}:
      </h5>
      <ul className={menuType === devices.MOBILE ? menuList : menuUtilList}>
        {menuItems?.map(({ id, name, url }, index) => {
          const text = name || formatMessage({ id: `menu-${id}` });

          return (
            <li
              key={index}
              className={
                menuType === devices.MOBILE ? menuListItem : menuUtilItem
              }
            >
              <a
                href={id !== links.CV ? url : `/cv/cv-${lang}.pdf`}
                title={text}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                className={classNames({
                  [menuListItemLink]: menuType === devices.MOBILE,
                  [menuUtilItemLink]: menuType === devices.DESKTOP,
                  [noTouchEvents]: getNoTouch()
                })}
              >
                <IconMenu
                  icon={id}
                  className={
                    menuType === devices.MOBILE
                      ? menuListItemIcon
                      : menuUtilItemIcon
                  }
                />
                <span>{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {variant !== 'maintenance' && (
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
              menuType === devices.MOBILE ? menuListItemIcon : menuUtilItemIcon
          }}
        />
      )}
    </nav>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};

export default connect(mapStateToProps)(SecondaryMenu);
