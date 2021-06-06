import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections } from '@app/types/types';
import { SASSvarsToJason } from '@app/utils/utils';
import deviceMovile from '@app/assets/images/sample-device-small.svg';
import deviceDesktop from '@app/assets/images/sample-device-large.svg';
import { InfoOverlayContext } from '@app/context/InfoOverlayContext/InfoOverlayContext';
import { MenuContext } from '@app/context/MenuContext/MenuContext';

import LoadImage from '@app/components/LoadImage/LoadImage';
import Section from '@app/components/Section/Section';
import ContentSlider from '@app/components/ContentSlider/ContentSlider';
import InfoOverlay from '@app/components/InfoOverlay/InfoOverlay';

import {
  workSample,
  workSampleDetail,
  workSampleTitle,
  workSampleSystem,
  workSampleImage,
  animationEnabled,
  images,
  imagesInner,
  imagesLarge,
  imagesLargeImgWrapper,
  imagesSmall,
  imagesSmallImgWrapper,
  imagesDevice,
  sectionColors as SASSSectionColors
} from './Work.module.scss';

const sectionColors = SASSvarsToJason(SASSSectionColors);

const workProjects: {
  id: string;
  title: string;
}[] = [
  {
    id: 'pokerstars',
    title: 'PokerStars Casino (Flutter Entertainment)'
  },
  {
    id: 'iqos',
    title: 'IQOS (Philip Morris International)'
  },
  {
    id: 'blu',
    title: 'BLU (Imperial Brands)'
  },
  {
    id: 'nexxus',
    title: 'NEXXUS (Uniliever)'
  },
  {
    id: 'vitra',
    title: 'Vitra'
  },
  {
    id: 'fotocasion',
    title: 'Fotocasión'
  },
  {
    id: 'libreria-desnivel',
    title: 'Librería Desnivel'
  },
  {
    id: 'kano-libros',
    title: 'Kano Libros'
  }
];

const Work: React.FC<{ panelIndex?: number }> = ({ panelIndex }) => {
  const { activePanel, setEnablePanels } = useContext(MenuContext);
  const { setInfoActive, setShowInfo, infoShown } = useContext(
    InfoOverlayContext
  );
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (panelIndex === activePanel && !infoShown) {
      setInfoActive(true);
      setEnablePanels(false);

      const testTimeout = setTimeout(() => {
        setShowInfo(false);
        setEnablePanels(true);
      }, 15000);
      return () => clearTimeout(testTimeout);
    }
  }, [
    activePanel,
    infoShown,
    panelIndex,
    setEnablePanels,
    setInfoActive,
    setShowInfo
  ]);

  return (
    <Section
      id={sections.WORK}
      heading={formatMessage({ id: 'section-work-title' })}
      variant="wide"
    >
      <article>
        <ContentSlider
          panelIndex={panelIndex}
          slides={workProjects.map(({ id, title }) => {
            return {
              content: (
                <div className={workSample}>
                  <div className={workSampleDetail}>
                    <h4 className={workSampleTitle}>{title}</h4>
                    <h5 className={workSampleSystem}>
                      {formatMessage({ id: `section-work-system-${id}` })}
                    </h5>
                    <p>
                      {formatMessage({
                        id: `section-work-description-${id}`
                      })}
                    </p>
                  </div>
                  <div className={workSampleImage}>
                    <div
                      className={classNames(images, {
                        [animationEnabled]: infoShown
                      })}
                    >
                      <div className={imagesInner}>
                        <figure
                          className={classNames(imagesLarge, {
                            [animationEnabled]: infoShown
                          })}
                        >
                          <LoadImage
                            source={`sample-image-large--${id}.jpg`}
                            text={title}
                            wrapper={<div className={imagesLargeImgWrapper} />}
                          />
                          <img
                            src={deviceDesktop}
                            alt=""
                            className={imagesDevice}
                          />
                        </figure>
                        <figure
                          className={classNames(imagesSmall, {
                            [animationEnabled]: infoShown
                          })}
                        >
                          <LoadImage
                            source={`sample-image-small--${id}.jpg`}
                            text={title}
                            wrapper={<div className={imagesSmallImgWrapper} />}
                          />
                          <img
                            src={deviceMovile}
                            alt=""
                            className={imagesDevice}
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              )
            };
          })}
        />
      </article>
      <InfoOverlay
        title={formatMessage({ id: 'section-work-disclaimer-title' })}
        bgColor={sectionColors['work']}
      >
        <>
          <p>{formatMessage({ id: 'section-work-disclaimer-text' })}</p>
        </>
      </InfoOverlay>
    </Section>
  );
};

export default Work;
