import React from 'react';
import classNames from 'classnames';
import { SASSvarsToJason } from '@app/utils/utils';
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
} from '@app/components/Reference/Colors/Colors.module.scss';

import { linkColors as SASSlinkColors } from './LinkColors.module.scss';

interface LinkInt {
  linkName: string;
  colorName: string;
  colorHex: string;
}

const Link: React.FC<LinkInt> = ({ linkName, colorName, colorHex }) => {
  return (
    <div className={classNames(gridItem, gridItemColor)}>
      <div
        className={classNames(
          gridThumb,
          gridThumbColor,
          'bg-color-' + colorName
        )}
      ></div>
      <div className={gridThumbDetail}>
        <a
          href="/"
          onClick={(event) => event.preventDefault()}
          className={classNames(gridThumbName, 'link-color-' + linkName)}
        >
          {linkName}
        </a>

        <span className={gridThumbValue}>{colorName}</span>
        <span className={gridThumbValue}>({colorHex})</span>
      </div>
    </div>
  );
};

interface LinkColorInt {
  linkName: string;
  colorName: string;
  colorHex: string;
}

const LinkColors: React.FC = () => {
  const colors = SASSvarsToJason(SASScolors);
  const linkColors = SASSvarsToJason(SASSlinkColors);

  const links: LinkColorInt[] = Object.keys(linkColors).map((linkColor) => {
    const colorHex = linkColors[linkColor];
    const colorName = Object.keys(colors).find(
      (color) => colors[color] === colorHex
    );

    // console.log('color name', colorName);

    const currentLink: LinkColorInt = {
      linkName: linkColor,
      colorName: colorName ? colorName : '',
      colorHex: colorHex
    };

    return currentLink;
  });

  return (
    <div className={grid}>
      {links.map((linkColor, index) => {
        const { linkName, colorName, colorHex } = linkColor;
        return (
          <Link
            key={index}
            linkName={linkName}
            colorHex={colorHex}
            colorName={colorName}
          />
        );
      })}
      {/* <br />
      <br />
      <b>colors:</b>
      <pre>{JSON.stringify(colors, null, 2)}</pre>
      <b>linkColors:</b>
      <pre>{JSON.stringify(linkColors, null, 2)}</pre> */}
    </div>
  );
};

export default LinkColors;
