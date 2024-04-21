import { useContext } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SASSvarsToJason } from '@/utils/utils';

import { NotificationContext } from '@/stories/lib/notification/NotificationContext';
import SampleItem from '@/stories/lib/sampleItem/SampleItem';

import styles from './Colors.module.scss';

const StoryComponent = () => {
  const { showNotification } = useContext(NotificationContext);
  const colors = SASSvarsToJason(styles.colors);

  const copyValueHandler = (text: string) => {
    showNotification({
      message: `Color variable "<b>${text}</b>" copied to clipboard.`,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <main>
      <article>
        <ul className="sample-grid">
          {Object.keys(colors).map((color: string) => (
            <SampleItem
              tagName="li"
              key={`key-${color}`}
              onCopy={() => copyValueHandler(`--color-${color}`)}
              className="sample-grid-item">
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
            </SampleItem>
          ))}
        </ul>
      </article>
    </main>
  );
};

const meta = {
  title: 'Global-Ui',
  component: StoryComponent,
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};
