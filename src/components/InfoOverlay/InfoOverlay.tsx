import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { InfoOverlayContext } from '@app/context/InfoOverlayContext/InfoOverlayContext';

import Info from './Info/Info';

import { overlay } from './InfoOverlay.module.scss';

const root = document.getElementById('root');
const infoWrapper = document.createElement('div');

interface InfoOverlayInt {
  title?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

const InfoOverlay: React.FC<InfoOverlayInt> = ({
  title,
  children,
  bgColor
}) => {
  const { infoActive } = useContext(InfoOverlayContext);

  useEffect(() => {
    if (infoActive) {
      infoWrapper.setAttribute('id', 'infoWrapper');
      infoWrapper.setAttribute('class', overlay);
      root?.after(infoWrapper);
    } else {
      document.getElementById('infoWrapper') &&
        document.body.removeChild(infoWrapper);
    }
  }, [infoActive]);

  return createPortal(
    <Info title={title} content={children} bgColor={bgColor} />,
    infoWrapper
  );
};

export default InfoOverlay;
