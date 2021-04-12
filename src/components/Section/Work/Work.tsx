import React from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';
import deviceMovile from '@app/assets/images/sample-device-small.svg';
import deviceDesktop from '@app/assets/images/sample-device-large.svg';

import LoadImage from '@app/components/LoadImage/LoadImage';
import Section from '@app/components/Section/Section';
import ContentSlider from '@app/components/ContentSlider/ContentSlider';

import {
  workSample,
  workSampleDetail,
  workSampleTitle,
  workSampleSystem,
  workSampleImage,
  images,
  imagesInner,
  imagesLarge,
  imagesLargeImg,
  imagesSmall,
  imagesSmallImg,
  imagesDevice
} from './Work.module.scss';

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
  const { formatMessage } = useIntl();

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
                    <div className={images}>
                      <div className={imagesInner}>
                        <figure className={imagesLarge}>
                          <LoadImage
                            source={`sample-image-large--${id}.jpg`}
                            text={title}
                            className={imagesLargeImg}
                          />
                          <img
                            src={deviceDesktop}
                            alt=""
                            className={imagesDevice}
                          />
                        </figure>
                        <figure className={imagesSmall}>
                          <LoadImage
                            source={`sample-image-small--${id}.jpg`}
                            text={title}
                            className={imagesSmallImg}
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
    </Section>
  );
};

export default Work;
