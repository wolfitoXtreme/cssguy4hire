import React, { useContext, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Navigation } from 'swiper';
import classNames from 'classnames';

import { MenuContext } from '@app/context/MenuContext/MenuContext';
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

let movement = 0;
const movementThreshold = 4;
interface ContentSliderInt {
  panelIndex?: number;
  slides?: {
    title?: string;
    content: React.ReactNode;
  }[];
}

const ContentSlider: React.FC<ContentSliderInt> = ({ panelIndex, slides }) => {
  const { menuIsOpen, menuIsToggling, activePanel } = useContext(MenuContext);

  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [enableSwiper, setEnableSwiper] = useState(true);
  const controlNext = useRef<HTMLButtonElement>(null);
  const controlPrev = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setEnableSwiper(!!menuIsOpen ? false : true);
    if (swiper) {
      swiper.allowSlideNext = enableSwiper;
      swiper.allowSlidePrev = enableSwiper;
    }
  }, [swiper, enableSwiper, menuIsOpen, menuIsToggling]);

  return (
    <Swiper
      direction="horizontal"
      onSwiper={(swiper) => setSwiper(swiper)}
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
      onSliderMove={(swiper, event) => {
        const { movementX } = event as PointerEvent;
        const { changedTouches } = event as TouchEvent;

        movement += Math.abs(movementX);

        (movement > movementThreshold || changedTouches) &&
          setActiveSlide(null);
      }}
      onTransitionEnd={({ realIndex }) => {
        movement = 0;
        setActiveSlide(realIndex);
      }}
    >
      {slides &&
        slides.map(({ title, content }, index) => (
          <SwiperSlide
            key={index}
            tag="li"
            className={classNames(slide, {
              'slide-active':
                index === activeSlide && panelIndex === activePanel
            })}
          >
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
