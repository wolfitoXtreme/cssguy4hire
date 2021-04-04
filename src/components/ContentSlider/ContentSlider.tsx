import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Navigation } from 'swiper';

import { ReactComponent as IconArrow } from '@app/assets/icons/icon-slider-arrow.svg';

import 'swiper/swiper.scss';

import {
  slider,
  slide,
  arrows,
  arrowsArrow,
  arrowsArrowIcon
} from './ContentSlider.module.scss';

SwiperCore.use([Keyboard, Navigation]);

interface ContentSliderInt {
  slides?: {
    title?: string;
    content: React.ReactNode;
  }[];
}

const ContentSlider: React.FC<ContentSliderInt> = ({ slides }) => {
  const controlNext = useRef<HTMLButtonElement>(null);
  const controlPrev = useRef<HTMLButtonElement>(null);

  return (
    <Swiper
      direction="horizontal"
      speed={600}
      loop
      wrapperTag="ul"
      className={slider}
      watchSlidesProgress
      keyboard
      onBeforeInit={(swiper) => {
        swiper.params.navigation = {
          nextEl: controlNext.current,
          prevEl: controlPrev.current
        };
      }}
    >
      {slides &&
        slides.map(({ title, content }, index) => (
          <SwiperSlide key={index} tag="li" className={slide}>
            {title && <h4>{title}</h4>}
            {content}
          </SwiperSlide>
        ))}

      <div className={arrows}>
        <button
          ref={controlPrev}
          title="previous"
          onClick={(event) => {
            const target = event.currentTarget as HTMLButtonElement;
            target.blur();
            event.preventDefault();
          }}
          className={arrowsArrow}
        >
          <IconArrow className={arrowsArrowIcon} />
          Previous
        </button>

        <button
          ref={controlNext}
          title="next"
          onClick={(event) => {
            const target = event.currentTarget as HTMLButtonElement;
            target.blur();
            event.preventDefault();
          }}
          className={arrowsArrow}
        >
          <IconArrow className={arrowsArrowIcon} />
          Next
        </button>
      </div>
    </Swiper>
  );
};

export default ContentSlider;
