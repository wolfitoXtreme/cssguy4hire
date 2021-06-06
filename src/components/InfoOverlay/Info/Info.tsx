import React, { useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { InfoOverlayContext } from '@app/context/InfoOverlayContext/InfoOverlayContext';
import { MenuContext } from '@app/context/MenuContext/MenuContext';

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
  bgColor?: string;
}

const Info: React.FC<InfoInt> = ({ title, content, bgColor }) => {
  const { setInfoActive, showInfo, setShowInfo, setInfoshown } = useContext(
    InfoOverlayContext
  );
  const { setEnablePanels } = useContext(MenuContext);

  const infoRef = useRef(null);

  return (
    <>
      <CSSTransition
        in={showInfo}
        timeout={duration}
        classNames={bttmToTopTransition}
        unmountOnExit
        nodeRef={infoRef}
        onExited={() => {
          setInfoActive(false);
          setInfoshown(true);
        }}
      >
        <div className={info} ref={infoRef}>
          <div
            className={infoCard}
            style={{ backgroundColor: bgColor && bgColor }}
          >
            <CloseButton
              actions={[
                () => {
                  setShowInfo(false);
                  setEnablePanels(true);
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
