import React from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { sections, SectionSkillsType } from '@app/types/types';

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

const skills: SectionSkillsType = [
  {
    id: 'programming',
    categories: [
      { text: 'JavaScript', expertise: 4 },
      { text: 'React.js', expertise: 3 },
      { text: 'Vue.js', expertise: 3 },
      { text: 'HTML5/<wbr>CSS3', expertise: 5 },
      { text: 'SASS', expertise: 4 },
      { text: 'Webpack/Vite', expertise: 3 },
      { text: 'Demandware/<wbr>SFCC', expertise: 3 },
      { text: 'Django', expertise: 3 }
    ],
    other:
      'jQuery, Gulp, Grunt, Git/SVN, PHP, ActionScript, MySQL, MongoDB, VSCode.'
  },
  {
    id: 'digital-editing',
    categories: [
      { text: 'Photoshop', expertise: 5 },
      { text: 'Illustrator', expertise: 4 },
      { text: 'InDesign', expertise: 3 },
      { text: 'After Effects', expertise: 3 },
      { text: 'Premiere Pro', expertise: 3 },
      { text: 'Figma', expertise: 3 },
      { text: '3ds Max', expertise: 2 },
      { text: 'Inkscape', expertise: 3 }
    ],
    other: 'Keyshape, Flash Professional, DreamWeaver, LightWave 3D, Zeplin.'
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
      { id: 'detail-oriented' },
      { id: 'critical' }
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

const Skills: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.SKILLS}
      heading={formatMessage({ id: 'section-skills-title' })}
      variant="wide"
    >
      <article>
        <ContentSlider
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
