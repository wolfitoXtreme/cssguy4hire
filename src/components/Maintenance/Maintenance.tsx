import React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { languageStateType, devices } from '@app/types/types';
import translations from '@app/translations/translations.json';
import Heading from '@app/components/Home/Heading/Heading';
import Footer from '@app/components/Footer/Footer';
import SecondaryMenu from '@app/components/Menu/SecondaryMenu/SecondaryMenu';
import MenuLang from '@app/components/Menu/MenuLang/MenuLang';
import { getNoTouch } from '@app/utils/utils';

import {
  panel,
  panelDetail
} from '@app/components/Section/Section.module.scss';
import {
  menuList,
  noTouchEvents,
  menuUtilList,
  menuUtilItem,
  menuUtilItemLink,
  menuUtilItemIcon
} from '@app/components/Menu/Menu.module.scss';

import {
  maintenance,
  maintenanceDetail,
  maintenanceHeading,
  maintenanceContent,
  maintenanceLang,
  maintenanceLangHeading,
  maintenanceFooter
} from './Maintenance.module.scss';

const Content: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <section className={panel + ' ' + maintenance}>
      <div className={panelDetail + ' ' + maintenanceDetail}>
        <div className={maintenanceHeading}>
          <Heading logoVariant="maintenance" />
        </div>
        <div className={maintenanceContent}>
          <div
            dangerouslySetInnerHTML={{
              __html: formatMessage({ id: 'home-text' })
            }}
          />
        </div>
      </div>

      <SecondaryMenu menuType={devices.DESKTOP} variant="maintenance" />
      <MenuLang
        heading={formatMessage({ id: 'menu-title-lang' })}
        styleClasses={{
          heading: maintenanceLangHeading,
          list: classNames(menuList, menuUtilList, maintenanceLang),
          listItem: menuUtilItem,
          anchor: classNames(menuUtilItemLink, {
            [noTouchEvents]: getNoTouch()
          }),
          icon: menuUtilItemIcon
        }}
      />
      <Footer footerVariant="maintenance" className={maintenanceFooter} />
    </section>
  );
};

const Maintenance = ({ lang }) => {
  const messages = translations[lang];

  return (
    <IntlProvider locale={lang} messages={messages}>
      <Content />
    </IntlProvider>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};
export default connect(mapStateToProps)(Maintenance);
