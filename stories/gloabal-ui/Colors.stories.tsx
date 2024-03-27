import type { Meta, StoryObj } from '@storybook/react';

import { SASSvarsToJason } from '@/utils/utils';

import '@/stories/styles.scss';

import styles from './Colors.module.scss';

const StoryComponent = () => {
  const colors = SASSvarsToJason(styles.colors);

  return (
    <main>
      <article>
        <ul className="sample-grid">
          {Object.keys(colors).map((color: string, index) => (
            <li key={index} className="sample-grid-item">
              <div
                className="sample-thumb"
                style={{ backgroundColor: colors[color] }}
              />
              <p className="sample-detail">
                <span className="sample-detail-name">{color}</span>
                <br />
                <span className="sample-detail-value">--color-{color}</span>
                <br />
                <span className="sample-detail-value">{colors[color]}</span>
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

export const Colors: Story = {};
