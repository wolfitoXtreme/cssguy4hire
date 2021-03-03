import React, { useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getNoTouch } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
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
import { languageStateType, languages, links, devices } from '@app/types/types';
import { changeLanguage } from '@store/actions';

import IconMenu from '../IconMenu/IconMenu';

interface SecondaryMenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
  variant?: 'internal' | 'maintenance';
  lang: languages;
  onLanguageChange: (...args: any[]) => void;
}

const SecondaryMenu: React.FC<SecondaryMenuInt> = ({
  menuType,
  variant,
  lang,
  onLanguageChange
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: {
      external: menuItems,
      lang: { id: langMenu }
    }
  } = useContext(MenuContext);

  const getOtherLang = (lang: languages) =>
    lang === languages.ENGLISH ? languages.SPANISH : languages.ENGLISH;

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
                href={url}
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

      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-lang' })}:
      </h5>
      <ul
        className={classNames({
          [menuList]: menuType === devices.MOBILE,
          [menuUtilList]: menuType === devices.DESKTOP,
          [menuUtilLangList]: menuType === devices.DESKTOP
        })}
      >
        <li
          className={classNames({
            [menuListItem]: menuType === devices.MOBILE,
            [menuUtilItem]: menuType === devices.DESKTOP
          })}
        >
          <a
            href="!#"
            onClick={(event) => {
              event.preventDefault();
              onLanguageChange(getOtherLang(lang));
            }}
            title={formatMessage({ id: `menu-${langMenu}` })}
            tabIndex={-1}
            className={classNames({
              [menuListItemLink]: menuType === devices.MOBILE,
              [menuUtilItemLink]: menuType === devices.DESKTOP,
              [noTouchEvents]: getNoTouch()
            })}
          >
            <IconMenu
              icon={`${links.LANG}-${getOtherLang(lang)}`}
              className={
                menuType === devices.MOBILE
                  ? menuListItemIcon
                  : menuUtilItemIcon
              }
            />
            <span>{formatMessage({ id: `menu-${langMenu}` })}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onLanguageChange: (value) => dispatch(changeLanguage(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenu);
