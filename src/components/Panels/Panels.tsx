import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper';
import 'swiper/swiper.scss';

import { MenuContext } from '@app/context/MenuContext/MenuContext';

import { panels, panel } from './Panels.module.scss';

SwiperCore.use([Keyboard, Mousewheel]);

let movement = 0;
const movementThreshold = 4;

interface PanelsInt {
  children: React.ReactNode;
}

const Panels: React.FC<PanelsInt> = ({ children }) => {
  const {
    changePanel,
    setActivePanel,
    currentPanel,
    setSwiperPanels
  } = useContext(MenuContext);

  return (
    <Swiper
      slidesPerView={1}
      onSwiper={(swiper) => setSwiperPanels(swiper)}
      initialSlide={currentPanel}
      direction="vertical"
      speed={400}
      keyboard
      mousewheel={{
        sensitivity: 10
      }}
      className={panels}
      onSlideChange={({ activeIndex }) => {
        changePanel(activeIndex);
      }}
      onSliderMove={(swiper, event) => {
        const { movementY } = event as PointerEvent;
        const { changedTouches } = event as TouchEvent;

        movement += Math.abs(movementY);
        (movement > movementThreshold || changedTouches) &&
          setActivePanel(null);
      }}
      onTransitionEnd={({ activeIndex }) => {
        setActivePanel(activeIndex);
      }}
    >
      {children &&
        React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={panel}>
            {React.isValidElement(child) &&
              React.cloneElement(child, {
                panelIndex: index
              })}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Panels;
