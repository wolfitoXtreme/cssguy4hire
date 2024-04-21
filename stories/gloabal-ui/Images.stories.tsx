import Image from 'next/image';
import { SyntheticEvent, useContext, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { importAll } from '@/utils/utils';

import { MagnifierContext } from '@/stories/lib/magnifier/MagnifierContext';
import { NotificationContext } from '@/stories/lib/notification/NotificationContext';
import SampleItem, {
  EnumSampleVariant,
} from '@/stories/lib/sampleItem/SampleItem';

type TImage = {
  file: string;
  name: string;
};

interface IImage {
  image: TImage;
}

const images = importAll(
  require.context('/public/assets/images/', false, /\.(svg|png|jpe?g|gif)$/),
) as TImage[];

const Picture: React.FC<IImage> = ({ image: { file, name } }) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const { showMagnifier } = useContext(MagnifierContext);
  const { showNotification } = useContext(NotificationContext);

  const isBackground = /-bkg/.test(name);
  const isDark = /-dark/.test(name);

  const handleSize = ({ target }: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth: width, naturalHeight: height } =
      target as HTMLImageElement;

    setDimensions({
      width,
      height,
    });
  };

  const copyValueHandler = (text: string) => {
    showNotification({
      message: `Image file name "<b>${text}</b>" copied to clipboard.`,
    });
    navigator.clipboard.writeText(text);
  };

  const magnifierHandler = (component: React.ReactNode, isDark: boolean) => {
    showMagnifier(component, isDark);
  };

  return (
    <SampleItem
      tagName="li"
      sampleVariant={
        isBackground || isDark
          ? EnumSampleVariant.DARK
          : EnumSampleVariant.LIGHT
      }
      onCopy={() => copyValueHandler(file)}
      onZoom={() =>
        magnifierHandler(
          <Image
            src={`/assets/images/${file}`}
            width={300}
            height={300}
            alt=""
          />,
          isDark,
        )
      }
      className="sample-grid-item">
      <div
        className={classNames('sample-thumb sample-thumb--image', {
          'sample-thumb--image-dark': isDark,
          'sample-thumb--image-bkg': isBackground,
        })}>
        <Image
          src={`/assets/images/${file}`}
          width={300}
          height={300}
          alt=""
          onLoad={handleSize}
        />
      </div>
      <p className="sample-detail">
        <span className="sample-detail-name">
          {name} - isDark {isDark.toString()}, isBackground{' '}
          {isBackground.toString()}
        </span>
        <br />
        <span className="sample-detail-value">
          ({dimensions.width}px, {dimensions.height}px)
        </span>
      </p>
    </SampleItem>
  );
};

const StoryComponent = () => {
  return (
    <main>
      <article>
        {(images.length && (
          <ul className="sample-grid">
            {images.map(image => {
              return <Picture key={`key-image-${image.name}`} image={image} />;
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
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Images: Story = {
  render: args => {
    return <StoryComponent {...args} />;
  },
};
