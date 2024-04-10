import { useContext, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import type { Meta, StoryObj } from '@storybook/react';

import { importAll } from '@/utils/utils';
import { SASSvarsToJason } from '@/utils/utils';

import { NotificationContext } from '@/stories/lib/notification/NotificationContext';
import SampleItem, {
  EnumSampleVariant,
} from '@/stories/lib/sampleItem/SampleItem';

import styles from './Colors.module.scss';

type TIcon = {
  file: string;
  name: string;
};

interface IIcon {
  icon: TIcon;
  color?: string;
}
const ICONS_DIR = '/assets/icons/';
const icons = importAll(
  require.context('/public/assets/icons/', false, /\.(svg)$/),
) as TIcon[];

const colors = Object.entries(SASSvarsToJason(styles.colors)).map(
  ([key, value]) => {
    return { title: key, color: value };
  },
);

const Icon: React.FC<IIcon> = ({ icon: { file, name }, color }) => {
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: string | null;
    height: string | null;
  }>({ width: null, height: null });

  useEffect(() => {
    if (viewBox) {
      const [, , width, height] = viewBox.match(/\b\d+\b/g) || [];
      setDimensions({ width, height });
    }
  }, [viewBox]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBeforeInjection = (svg: any) => {
    if (svg) {
      const viewBox = svg.getAttribute('viewBox');
      setViewBox(viewBox);
    }
  };

  const { showNotification } = useContext(NotificationContext);

  const copyValueHandler = (text: string) => {
    showNotification({
      message: `Icon name "<b>${text}</b>" copied to clipboard.`,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <SampleItem
      tagName="li"
      sampleVariant={EnumSampleVariant.DARK}
      onCopy={() => copyValueHandler(name)}
      className="sample-grid-item sample-grid-item--clickable">
      <div className="sample-thumb sample-thumb--icon" style={{ color }}>
        <ReactSVG
          src={`${ICONS_DIR}${file}`}
          loading={() => <>Loading...</>}
          beforeInjection={handleBeforeInjection}
          onError={error => {
            // eslint-disable-next-line no-console
            console.error({ error });
          }}
        />
      </div>
      <p className="sample-detail">
        <span className="sample-detail-name">{name}</span>
        <br />
        <span className="sample-detail-value">
          {dimensions.width}px {dimensions.height}px
        </span>
      </p>
    </SampleItem>
  );
};

const StoryComponent = (iconColor: Record<string, string>) => {
  const svgIconColor = Object.values(iconColor)[0] || undefined;

  return (
    <main>
      <article>
        {(icons.length && (
          <ul className="sample-grid">
            {icons.map(icon => {
              return (
                <Icon
                  key={`key-icon-${icon.name}`}
                  icon={icon}
                  color={svgIconColor && svgIconColor}
                />
              );
            })}
          </ul>
        )) || <p>No icons defined for this project</p>}
      </article>
    </main>
  );
};

const meta = {
  title: 'Global-Ui',
  component: StoryComponent,
  argTypes: {
    iconColor: {
      control: {
        type: 'color',
        presetColors: colors,
      },
    },
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  render: args => {
    return <StoryComponent {...args} />;
  },
};
