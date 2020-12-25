import React from 'react';
import Section from '@app/components/Reference/Section/Section';
import { SASSvarsToJason } from '@app/utils/utils';
import classNames from 'classnames';
import {
  grid,
  gridItem,
  gridThumb,
  gridThumbDetail,
  gridThumbName,
  gridThumbValue
} from '@app/components/Reference/Reference.module.scss';

import {
  gridItemColor,
  gridThumbColor,
  colors as SASScolors
} from './Colors.module.scss';

const Colors: React.FC = () => {
  const colors = SASSvarsToJason(SASScolors);

  return (
    <Section heading="Colors">
      <>
        <div className={grid}>
          {Object.keys(colors).map((colorName, index) => (
            <div key={index} className={classNames(gridItem, gridItemColor)}>
              <div
                className={classNames(
                  gridThumb,
                  gridThumbColor,
                  'bg-color-' + colorName
                )}
              ></div>
              <div className={gridThumbDetail}>
                <span className={gridThumbName}>{colorName}</span>
                <span className={gridThumbValue}>({colors[colorName]})</span>
              </div>

              {/* <div class="ref-thumb-grid__item ref-thumb-grid__item--color">
                <div class="ref-thumb ref-thumb--color bg-color-black"></div>
                <div class="ref-thumb-detail">
                  <div class="ref-thumb-detail__name">black</div>
                  <div class="ref-thumb-detail__value">(#000)</div>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </>
      {/* <pre>{JSON.stringify(colors, null, 2)}</pre> */}
    </Section>
  );
};

export default Colors;
