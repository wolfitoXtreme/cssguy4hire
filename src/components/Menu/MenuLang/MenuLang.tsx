import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

import { changeLanguage } from '@store/actions';

import { MenuContext } from '@app/context/MenuContext/MenuContext';
import { LanguageStateType, languages, links } from '@app/types/types';

import IconMenu from '../IconMenu/IconMenu';

interface MenuLangInt {
  heading: string;
  styleClasses: {
    heading: string;
    list: string;
    listItem: string;
    anchor: string;
    icon: string;
  };
  lang: languages;
  onLanguageChange: (...args: any[]) => void;
  closeMobileMenu: (...args: any[]) => void | undefined;
}

const MenuLang: React.FC<MenuLangInt> = ({
  styleClasses,
  lang,
  onLanguageChange,
  closeMobileMenu
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: {
      lang: { id: langMenu }
    }
  } = useContext(MenuContext);

  const getOtherLang = (lang: languages) =>
    lang === languages.ENGLISH ? languages.SPANISH : languages.ENGLISH;

  return (
    <>
      <h5 className={styleClasses.heading}>
        {formatMessage({ id: 'menu-title-lang' })}
      </h5>
      <ul className={styleClasses.list}>
        <li className={styleClasses.listItem}>
          <a
            href="!#"
            onClick={(event) => {
              const target = event.currentTarget as HTMLAnchorElement;
              target.blur();
              event.preventDefault();
              onLanguageChange(getOtherLang(lang));
              closeMobileMenu && closeMobileMenu();
            }}
            title={formatMessage({ id: `menu-${langMenu}` })}
            tabIndex={-1}
            className={styleClasses.anchor}
          >
            <IconMenu
              icon={`${links.LANG}-${getOtherLang(lang)}`}
              className={styleClasses.icon}
            />
            <span>{formatMessage({ id: `menu-${langMenu}` })}</span>
          </a>
        </li>
      </ul>
    </>
  );
};

// export default MenuLang;

const mapStateToProps = (state: LanguageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onLanguageChange: (value) => dispatch(changeLanguage(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLang);
