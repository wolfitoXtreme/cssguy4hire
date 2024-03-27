import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { SASSvarsToJason, kebabCaseToTitleCase } from '@/utils/utils';

import '@/stories/styles.scss';

import styles from './Fonts.module.scss';

type TFontVariant = {
  variant: string;
  variantName: string;
  variantWeight: string;
};

type TFont = {
  font: string;
  fontName: string;
  fontVariants: TFontVariant[];
};

const StoryComponent = () => {
  const fonts = SASSvarsToJason(styles.fonts);
  const fontSizes = SASSvarsToJason(styles.fontSizes);

  const fontsFormatted = Object.keys(fonts).reduce<TFont[]>(
    (result, currentFont) => {
      console.log(fonts[currentFont]);

      const fontVariants = Object.keys(fonts[currentFont]).reduce<
        TFontVariant[]
      >((result, fontWeight) => {
        return [
          ...result,
          {
            variant: fonts[currentFont][fontWeight],
            variantName: kebabCaseToTitleCase(
              fonts[currentFont][fontWeight].replace(/([a-z]+-)/g, ''),
            ),
            variantWeight: fontWeight,
          },
        ];
      }, []);

      return [
        ...result,
        {
          font: currentFont,
          fontName: kebabCaseToTitleCase(currentFont),
          fontVariants,
        },
      ];
    },
    [],
  );
  console.log({ fontsFormatted }, { fontSizes });

  return (
    <main>
      {fontsFormatted.map(({ font, fontName, fontVariants }) => (
        <article
          key={font}
          className={classNames(styles['font-sample'], `font-family-${font}`)}>
          <header>
            <h5>{fontName}</h5>
            <p>
              {fontVariants.map(({ variant, variantName }, index) => (
                <>
                  <span key={variant} className={`font-family-${variant}`}>
                    {variantName}
                  </span>
                  {index < fontVariants.length - 1 ? ', ' : ''}
                </>
              ))}
            </p>
          </header>

          <section>
            {Object.keys(fontSizes).map((sizeName, index) => (
              <div key={index} className={styles['size']}>
                <p
                  className={classNames(
                    styles['size-sample'],
                    `font-size-${sizeName}`,
                  )}>
                  Mauris auctor aliquam finibus. Vestibulum tincidunt magna.
                </p>
                <p className={styles['size-detail']}>
                  {sizeName} ({fontSizes[sizeName]})
                </p>
              </div>
            ))}
          </section>
        </article>
      ))}
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

export const Fonts: Story = {};
