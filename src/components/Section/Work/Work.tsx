import React from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections } from '@app/types/types';

import LoadImage from '@app/components/LoadImage/LoadImage';
import Section from '@app/components/Section/Section';
import ContentSlider from '@app/components/ContentSlider/ContentSlider';

import {
  workSample,
  workSampleDescription,
  workSampleTitle,
  workSampleImage,
  images
} from './Work.module.scss';

const workProjects: {
  id: string;
  title: string;
}[] = [
  {
    id: 'mimacom',
    title: 'Mimacom'
  },
  {
    id: 'stars-group',
    title: 'The Stars Group'
  },
  {
    id: 'accenture',
    title: 'Accenture'
  },
  {
    id: 'ppi',
    title: 'Proveedores de Presencia en Internet'
  }
];

const Work: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.WORK}
      heading={formatMessage({ id: 'section-work-title' })}
      variant="wide"
    >
      <article>
        <ContentSlider
          slides={workProjects.map(({ id, title }) => {
            return {
              content: (
                <div className={workSample}>
                  <div className={workSampleTitle}>
                    <h4>{title}</h4>
                    <h5>
                      {formatMessage({
                        id: `section-work-company-${id}-role`
                      })}
                    </h5>
                  </div>

                  <div className={workSampleImage}>
                    <figure className={classNames(images)}>
                      <LoadImage
                        source={`logo-${id}.svg`}
                        text={title}
                        svgInline
                      />
                    </figure>
                  </div>

                  <div className={workSampleDescription}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: formatMessage({
                          id: `section-work-company-${id}-role-description`
                        })
                      }}
                    />
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
