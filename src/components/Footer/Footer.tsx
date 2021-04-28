import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import { languageStateType } from '@app/types/types';

interface FooterInt {
  className?: string;
  footerVariant?: 'maintenance';
}

const Footer: React.FC<FooterInt> = ({ footerVariant, className }) => {
  const { formatMessage } = useIntl();

  return (
    <footer className={!footerVariant ? 'hidden' : className}>
      <address
        dangerouslySetInnerHTML={{
          __html: formatMessage({ id: 'footer-contact' })
        }}
      />
    </footer>
  );
};

const mapStateToProps = (state: languageStateType) => {
  return {
    lang: state.languageReducer.lang
  };
};

export default connect(mapStateToProps)(Footer);
