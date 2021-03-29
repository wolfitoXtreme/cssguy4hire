import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper';
import 'swiper/swiper.scss';

import { MenuContext } from '@app/context/MenuContext/MenuContext';

import { panels, panel } from './Panels.module.scss';

SwiperCore.use([Keyboard, Mousewheel]);

interface PanelsInt {
  children: React.ReactNode;
}

const Panels: React.FC<PanelsInt> = ({ children }) => {
  const { changePanel, currentPanel, setSwiperPanels } = useContext(
    MenuContext
  );

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
    >
      {children &&
        React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={panel}>
            {child}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Panels;
