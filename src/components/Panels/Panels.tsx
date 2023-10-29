import React, { useContext, useEffect, Children } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper';
import 'swiper/swiper.scss';

import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';

import { panels, panel } from './Panels.module.scss';

SwiperCore.use([Keyboard, Mousewheel]);

let movement = 0;
const movementThreshold = 4;

export const PanelsIndexContext = React.createContext<{
  panelIndex: number;
}>({
  panelIndex: 0
});

interface PanelsInt {
  children: React.ReactNode;
}

const Panels: React.FC<PanelsInt> = ({ children }) => {
  const {
    menuIsOpen,
    changePanel,
    setActivePanel,
    currentPanel,
    setSwiperPanels,
    setEnablePanels
  } = useContext(NavigationContext);

  const childrenArray = Children.toArray(children);

  useEffect(() => {
    menuIsOpen && setEnablePanels(false);
  }, [menuIsOpen, setEnablePanels]);

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
        Children.map(childrenArray, (child, index) => (
          <SwiperSlide key={index} className={panel}>
            <PanelsIndexContext.Provider
              key={index}
              value={{ panelIndex: index }}
            >
              {child}
            </PanelsIndexContext.Provider>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Panels;
