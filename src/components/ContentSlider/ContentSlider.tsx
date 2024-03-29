import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useIntl } from 'react-intl';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Navigation } from 'swiper';
import classNames from 'classnames';

import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';
import { ReactComponent as IconArrow } from '@app/assets/icons/icon-slider-arrow.svg';
import { getNoTouch } from '@app/utils/utils';

import { PanelsIndexContext } from '@app/components/Panels/Panels';

import {
  slider,
  slide,
  slideContent,
  arrows,
  arrowsArrow,
  arrowsArrowIcon,
  noTouchEvents
} from './ContentSlider.module.scss';

import 'swiper/swiper.scss';

SwiperCore.use([Keyboard, Navigation]);

let movement = 0;
const movementThreshold = 4;
interface ContentSliderInt {
  slides?: {
    title?: string;
    content: React.ReactNode;
  }[];
}

const ContentSlider: React.FC<ContentSliderInt> = ({ slides }) => {
  const { formatMessage } = useIntl();
  const {
    menuIsOpen,
    enablePanels,
    menuIsToggling,
    activePanel,
    staticContent
  } = useContext(NavigationContext);
  const { panelIndex } = useContext(PanelsIndexContext);

  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [enableSwiper, setEnableSwiper] = useState(true);
  const controlNext = useRef<HTMLButtonElement>(null);
  const controlPrev = useRef<HTMLButtonElement>(null);
  const staticContentSet = useRef<boolean>(false);

  const navNextText = formatMessage({ id: 'nav-next' });
  const navPrevText = formatMessage({ id: 'nav-previous' });

  const resetSwiper = useCallback(() => {
    swiper?.update();
  }, [swiper]);

  useEffect(() => {
    setEnableSwiper(!!menuIsOpen || !enablePanels ? false : true);
    if (staticContent && !staticContentSet.current) {
      staticContentSet.current = true;
    }

    if (swiper) {
      swiper.allowSlideNext = enableSwiper;
      swiper.allowSlidePrev = enableSwiper;
      swiper.allowTouchMove = enableSwiper;
      if (!staticContent && staticContentSet.current) {
        resetSwiper();
      }
    }
  }, [
    swiper,
    enableSwiper,
    menuIsOpen,
    menuIsToggling,
    enablePanels,
    staticContent,
    staticContentSet,
    resetSwiper
  ]);

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
            <div className={slideContent}>
              {title && <h4>{title}</h4>}
              {content}
            </div>
          </SwiperSlide>
        ))}

      <div className={arrows}>
        <button
          ref={controlPrev}
          title={navPrevText}
          onClick={(event) => {
            const target = event.currentTarget as HTMLButtonElement;
            target.blur();
            event.preventDefault();
          }}
          className={classNames(arrowsArrow, { [noTouchEvents]: getNoTouch() })}
        >
          <IconArrow className={arrowsArrowIcon} />
          {navPrevText}
        </button>

        <button
          ref={controlNext}
          title={navNextText}
          onClick={(event) => {
            const target = event.currentTarget as HTMLButtonElement;
            target.blur();
            event.preventDefault();
          }}
          className={classNames(arrowsArrow, { [noTouchEvents]: getNoTouch() })}
        >
          <IconArrow className={arrowsArrowIcon} />
          {navNextText}
        </button>
      </div>
    </Swiper>
  );
};

export default ContentSlider;
