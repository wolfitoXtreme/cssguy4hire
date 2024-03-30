import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { SASSvarsToJason } from '@/utils/utils';

import styles from './Links.module.scss';

const StoryComponent = () => {
  const linkColors = SASSvarsToJason(styles.linkColors);
  const colors = SASSvarsToJason(styles.colors);

  const clickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => event.preventDefault();

  const getHsl = (color: string) => {
    const colorKey = color.replace(/^--color-/, '');

    return colors[colorKey];
  };

  return (
    <main>
      <article>
        <ul className="sample-grid">
          {Object.keys(linkColors).map((color: string) => (
            <li key={`key-${color}`} className="sample-grid-item">
              <div
                className="sample-thumb"
                style={{ backgroundColor: `var(--link-color-${color})` }}
              />
              <p className="sample-detail">
                <a
                  href="#"
                  onClick={clickHandler}
                  className={classNames(
                    'sample-detail-name',
                    styles[`sample-link-${color}`],
                  )}>
                  {color}
                </a>
                <br />
                <span className="sample-detail-value">{linkColors[color]}</span>
                <br />
                <span className="sample-detail-value">
                  {getHsl(linkColors[color])}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
};

const meta = {
  title: 'Global-Ui',
  component: StoryComponent,
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Links: Story = {};
