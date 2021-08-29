import React from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { ReactComponent as LogoImage } from '@app/assets/images/logo.svg';
import { ReactComponent as LogoImageLandscape } from '@app/assets/images/logo-landscape.svg';
import { ReactComponent as LogoImageDarkBg } from '@app/assets/images/logo-dark-bg.svg';
import { ReactComponent as LogoImageLandscapeDarkBg } from '@app/assets/images/logo-landscape-dark-bg.svg';

import {
  siteHeading,
  siteLogo,
  siteLogoSimple,
  logoWrapper,
  logoImg,
  logoImgLandscape
} from './Heading.module.scss';

interface HeadingInt {
  logoVariant?: 'maintenance';
}

const Heading: React.FC<HeadingInt> = ({ logoVariant }) => {
  const { formatMessage } = useIntl();
  const heading =
    formatMessage({ id: 'site' }) + ' - ' + formatMessage({ id: 'site-text' });

  return (
    <h1 className={siteHeading} title={heading}>
      <div className={classNames(siteLogo, { [siteLogoSimple]: logoVariant })}>
        <div className={logoWrapper}>
          {(!logoVariant && (
            <>
              <LogoImage className={logoImg} />
              <LogoImageLandscape
                className={classNames(logoImg, logoImgLandscape)}
              />
            </>
          )) || (
            <>
              <LogoImageDarkBg className={logoImg} />
              <LogoImageLandscapeDarkBg
                className={classNames(logoImg, logoImgLandscape)}
              />
            </>
          )}
        </div>
      </div>
      <span className="hidden">{heading}</span>
    </h1>
  );
};

export default Heading;
