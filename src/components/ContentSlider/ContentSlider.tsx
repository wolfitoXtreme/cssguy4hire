import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';
import 'swiper/swiper.scss';

import { slide } from './ContentSlider.module.scss';

SwiperCore.use([Keyboard]);

interface ContentSliderInt {
  children?: React.ReactNode;
  slides?: {
    title?: string;
    content: React.ReactNode;
  }[];
}

const ContentSlider: React.FC<ContentSliderInt> = ({ slides, children }) => (
  <Swiper
    direction="horizontal"
    speed={600}
    loop
    wrapperTag="ul"
    watchSlidesProgress
    keyboard
  >
    {slides &&
      slides.map(({ title, content }, index) => (
        <SwiperSlide key={index} tag="li" className={slide}>
          {title && <h4>{title}</h4>}
          {content}
        </SwiperSlide>
      ))}
  </Swiper>
);

export default ContentSlider;
