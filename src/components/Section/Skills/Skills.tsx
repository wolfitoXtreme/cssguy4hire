import React from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections, sectionSkillsType } from '@app/types/types';

import Section from '@app/components/Section/Section';
import ContentSlider from '@app/components/ContentSlider/ContentSlider';

import {
  list,
  listItemExpertiseText,
  listItemExpertiseAmount,
  listItemExpertiseDot,
  listItemExpertiseDotFilled,
  listItemExpertise,
  additional,
  dotsAmount
} from './Skills.module.scss';

const skills: sectionSkillsType = [
  {
    id: 'programming',
    categories: [
      { text: 'JavaScript', expertise: 4 },
      { text: 'reactJS', expertise: 3 },
      { text: 'HTML5/<wbr>CSS3', expertise: 5 },
      { text: 'SASS', expertise: 4 },
      { text: 'GulpJS/GruntJS/<wbr>Webpack', expertise: 3 },
      { text: 'Demandware/<wbr>SFCC', expertise: 3 },
      { text: 'Django', expertise: 3 }
    ],
    other:
      ' AngularJS, jQuery, Git/SVN, PHP, ActionScript, MySQL, MongoDB, VSCode.'
  },
  {
    id: 'digital-editing',
    categories: [
      { text: 'Photoshop', expertise: 5 },
      { text: 'Illustrator', expertise: 4 },
      { text: 'InDesign', expertise: 3 },
      { text: 'After Effects', expertise: 3 },
      { text: 'Premiere Pro', expertise: 3 },
      { text: 'Blender', expertise: 2 },
      { text: 'Inkscape', expertise: 3 }
    ],
    other:
      '3ds Max, Keyshape, Flash Professional, DreamWeaver, LightWave 3D, Zeplin.'
  },
  {
    id: 'personal',
    categories: [
      { id: 'creativity' },
      { id: 'learning' },
      { id: 'team-working' },
      { id: 'organization' },
      { id: 'motivation' },
      { id: 'communication' },
      { id: 'problems-solving' },
      { id: 'detail-oriented' }
    ]
  }
];

const dots: string[] = [];
for (let i = 0; i < parseInt(dotsAmount); i++) {
  dots.push('');
}

const TextAndExpertise: React.FC<{ text?: string; expertise?: number }> = ({
  text,
  expertise
}) => {
  return (
    <>
      {(expertise && (
        <>
          <span
            className={listItemExpertiseText}
            dangerouslySetInnerHTML={{ __html: `${text}` }}
          />
          <span className={listItemExpertiseAmount}>
            {dots.map((dot, index) => {
              return (
                <span
                  key={index}
                  className={classNames(listItemExpertiseDot, {
                    [listItemExpertiseDotFilled]: index < expertise
                  })}
                />
              );
            })}
          </span>
        </>
      )) || <>{text}</>}
    </>
  );
};

const Skills: React.FC<{ panelIndex?: number; test?: string }> = ({
  panelIndex
}) => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.SKILLS}
      // panelIndex={panelIndex}
      heading={formatMessage({ id: 'section-skills-title' })}
      variant="wide"
    >
      <article>
        <ContentSlider
          panelIndex={panelIndex}
          slides={skills.map(({ id, categories, other }) => {
            return {
              title: formatMessage({
                id: `section-skills-category-title-${id}`
              }),
              content: (
                <>
                  <ul className={list}>
                    {categories.map(({ id, text, expertise }, index) => {
                      const outputText = id
                        ? formatMessage({ id: `section-skills-text-${id}` })
                        : text;

                      return (
                        <li
                          key={index}
                          className={classNames({
                            [listItemExpertise]: expertise
                          })}
                        >
                          <TextAndExpertise
                            text={outputText}
                            expertise={expertise}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  {other && (
                    <p className={additional}>
                      <b>
                        {formatMessage({
                          id: 'section-skills-additional-title'
                        })}
                      </b>
                      : {other}
                    </p>
                  )}
                </>
              )
            };
          })}
        />
      </article>
    </Section>
  );
};

export default Skills;
