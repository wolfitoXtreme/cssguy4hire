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
  noTouchEvents,
  menuListItemLink
} from '@app/components/Menu/Menu.module.scss';
import { stateType, languages, links } from '@app/types/types';
import { changeLanguage } from '@store/actions';

import IconMenu from '../IconMenu/IconMenu';

interface SecondaryMenuInt {
  lang: languages;
  onLanguageChange: (...args: any[]) => void;
}

const SecondaryMenu: React.FC<SecondaryMenuInt> = ({
  lang,
  onLanguageChange
}) => {
  const { formatMessage } = useIntl();
  const {
    external: menuItems,
    lang: { id: langMenu }
  } = useContext(MenuContext);

  const getOtherLang = (lang: languages) =>
    lang === languages.ENGLISH ? languages.SPANISH : languages.ENGLISH;

  return (
    <nav className={menu}>
      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-secondary' })}:
      </h5>
      <ul className={menuList}>
        {menuItems?.map(({ id, name, url }, index) => {
          const text = name || formatMessage({ id: `menu-${id}` });
          return (
            <li key={index} className={menuListItem}>
              <a
                href={url}
                title={text}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                className={classNames(menuListItemLink, {
                  [noTouchEvents]: getNoTouch()
                })}
              >
                <IconMenu icon={id} />
                <span>{text}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-lang' })}:
      </h5>
      <ul className={menuList}>
        <li className={menuListItem}>
          <a
            href="!#"
            onClick={(event) => {
              event.preventDefault();
              onLanguageChange(getOtherLang(lang));
            }}
            title={formatMessage({ id: `menu-${langMenu}` })}
            tabIndex={-1}
            className={classNames(menuListItemLink, {
              [noTouchEvents]: getNoTouch()
            })}
          >
            <IconMenu icon={`${links.LANG}-${getOtherLang(lang)}`} />
            <span>{formatMessage({ id: `menu-${langMenu}` })}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: stateType) => {
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
