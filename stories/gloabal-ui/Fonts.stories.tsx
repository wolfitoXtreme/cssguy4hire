import type { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { SASSvarsToJason, kebabCaseToTitleCase } from '@/utils/utils';

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

  return (
    <main className={styles['font-sample']}>
      {fontsFormatted.map(({ font, fontName, fontVariants }) => (
        <article key={`key-${font}`} className={`font-family-${font}`}>
          <header>
            <h3>{fontName}</h3>
            <p>
              {fontVariants.map(({ variant, variantName }, index) => (
                <span key={`key-${font}-${variant}`}>
                  <span className={`font-family-${variant}`}>
                    {variantName}
                  </span>
                  {index < fontVariants.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </header>

          <section>
            {Object.keys(fontSizes).map(sizeName => (
              <div key={`key-${font}-${sizeName}`} className={styles['size']}>
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
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fonts: Story = {};
