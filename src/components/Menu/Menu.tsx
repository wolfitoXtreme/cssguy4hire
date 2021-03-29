import React from 'react';

import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import { devices } from '@app/types/types';

import PrimaryMenu from './PrimaryMenu/PrimaryMenu';
import SecondaryMenu from './SecondaryMenu/SecondaryMenu';

import { navigation, navigationSwiper } from './Menu.module.scss';

SwiperCore.use([Scrollbar, Mousewheel]);

interface MenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
}

const Menu = React.forwardRef(({ menuType }: MenuInt, ref) => (
  <>
    {(menuType === devices.MOBILE && (
      <nav className={navigation} ref={ref as React.RefObject<HTMLElement>}>
        <Swiper
          slidesPerView="auto"
          freeMode
          direction="vertical"
          speed={400}
          mousewheel={{
            sensitivity: 10
          }}
          scrollbar={{
            draggable: true
          }}
          className={navigationSwiper}
          preventClicksPropagation
          preventClicks
        >
          <SwiperSlide>
            <PrimaryMenu menuType={menuType} />
            <SecondaryMenu menuType={menuType} />
          </SwiperSlide>
        </Swiper>
      </nav>
    )) || <PrimaryMenu menuType={menuType} />}
  </>
));

export default Menu;
