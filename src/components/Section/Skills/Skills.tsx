import React from 'react';
import { useIntl } from 'react-intl';

import { sections, sectionSkillsType } from '@app/types/types';

import Section from '@app/components/Section/Section';
import ContentSlider from '@app/components/ContentSlider/ContentSlider';

import { skillsAdditional } from './Skills.module.scss';

const skills: sectionSkillsType = [
  {
    id: 'programming',
    categories: [
      { text: 'JavaScript', expertise: 4 },
      { text: 'reactJS', expertise: 3 },
      { text: 'HTML5/CSS3', expertise: 5 },
      { text: 'SASS', expertise: 4 },
      { text: 'GulpJS/GruntJS/Webpack', expertise: 3 },
      { text: 'Demandware/SFCC', expertise: 3 },
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
      { text: 'Keyshape', expertise: 2 }
    ],
    other:
      '3ds Max, Flash Professional, DreamWeaver, Acrobat Pro, LightWave 3D, Zeplin.'
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

const Skills: React.FC = () => {
  const { formatMessage } = useIntl();

  const textAndExpertise = (
    text: string | undefined,
    expertise: number | undefined
  ) => {
    const dots = (expertise && expertise) || '';
    return {
      __html: (text && text + dots) || ''
    };
  };

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
                  <ul className="column-list">
                    {categories.map(({ id, text, expertise }, index) => {
                      const outputText = id
                        ? formatMessage({ id: `section-skills-text-${id}` })
                        : text;

                      return (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={textAndExpertise(
                            outputText,
                            expertise
                          )}
                          className="column-list-item"
                        />
                      );
                    })}
                  </ul>
                  {other && (
                    <p className={skillsAdditional}>
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
