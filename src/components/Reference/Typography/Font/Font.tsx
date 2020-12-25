import React from 'react';
import { FontInt } from '@app/types/types';
import { SASSvarsToJason } from '@app/utils/utils';
import classNames from 'classnames';

import {
  sizes,
  sizesSize,
  sizeText,
  sizeDetail,
  fontSizes as SASSfontSizes
} from './Font.module.scss';

interface variantProps {
  addComma: boolean;
  variantName: string;
  weight: number;
}

const Variant: React.FC<variantProps> = ({
  variantName,
  weight,
  addComma = true
}) => (
  <>
    <span style={{ fontWeight: weight }}>{variantName}</span>
    {addComma && ', '}
  </>
);

interface FontProps {
  fontFamily: FontInt;
}

const Font: React.FC<FontProps> = ({ fontFamily }) => {
  const { font: fontClassName, fontName, fontVariants } = fontFamily;
  const fontSizes = SASSvarsToJason(SASSfontSizes);

  return (
    <div className={'font-family-' + fontClassName}>
      <h5>{fontName}</h5>
      <p>
        {fontVariants.map((variant, index) => (
          <Variant
            key={index}
            variantName={variant.variantName}
            weight={parseInt(variant.variantWeight)}
            addComma={index < fontVariants.length - 1}
          />
        ))}
      </p>
      <div className={sizes}>
        {Object.keys(fontSizes).map((sizeName, index) => (
          <div key={index} className={sizesSize}>
            <div className={classNames(sizeText, 'font-size-' + sizeName)}>
              Mauris auctor aliquam finibus. Vestibulum tincidunt magna.
            </div>
            <div className={sizeDetail}>
              {sizeName} ({fontSizes[sizeName]})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Font;
