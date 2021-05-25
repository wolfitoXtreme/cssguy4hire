import React, { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { InfoOverlayContext } from '@app/context/InfoOverlayContext/InfoOverlayContext';

import CloseButton from '@app/components/CloseButton/CloseButton';

import {
  info,
  infoCard,
  infoCardTitle,
  infoCardCloseButton,
  infoCardContent,
  bttmToTopEnter,
  bttmToTopEnterActive,
  bttmToTopExit,
  bttmToTopExitActive,
  transitionDuration
} from './Info.module.scss';

const duration = parseInt(transitionDuration);

const bttmToTopTransition = {
  enter: bttmToTopEnter,
  enterActive: bttmToTopEnterActive,
  exit: bttmToTopExit,
  exitActive: bttmToTopExitActive
};

interface InfoInt {
  title?: string;
  content: React.ReactNode;
}

const Info: React.FC<InfoInt> = ({ title, content }) => {
  const { infoActive, showInfo } = useContext(InfoOverlayContext);
  const [showCard, setShowCard] = useState(false);

  const infoRef = useRef(null);

  useEffect(() => {
    infoActive && setShowCard(true);
  }, [infoActive]);

  return (
    <>
      <CSSTransition
        in={showCard}
        timeout={duration}
        classNames={bttmToTopTransition}
        unmountOnExit
        nodeRef={infoRef}
        onExited={() => showInfo(false)}
      >
        <div className={info} ref={infoRef}>
          <div className={infoCard}>
            <CloseButton
              actions={[
                () => {
                  setShowCard(false);
                }
              ]}
              className={infoCardCloseButton}
              variant="small"
              iconType="inverted"
            />
            <div className={infoCardContent}>
              {title && <h4 className={infoCardTitle}>{title}</h4>}
              {content}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Info;
