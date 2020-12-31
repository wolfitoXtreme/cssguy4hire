import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { getFileName, importAll } from '@app/utils/utils';
import Section from '@app/components/Reference/Section/Section';
import {
  grid,
  gridItem,
  gridThumb,
  gridThumbDetail,
  gridThumbName,
  gridThumbValue
} from '@app/components/Reference/Reference.module.scss';

import { gridIcons, gridThumbIcon } from './Icons.module.scss';

const icons = importAll(
  require.context('@app/assets/icons/', false, /\.(svg)$/)
);

const Icon: React.FC<{ path: string }> = ({ path }) => {
  const [dimensions, setDimensions] = useState<{
    width: string | null;
    height: string | null;
  }>({ width: null, height: null });

  const { fileName: iconName } = getFileName(path);

  return (
    <div className={gridItem}>
      <div className={classNames(gridThumb, gridThumbIcon)}>
        <ReactSVG
          src={path}
          afterInjection={(error, svg) => {
            if (error) {
              console.error(error);
              return;
            }
            svg?.addEventListener('load', () => {
              // TODO - is this correct/necessary, not always getting icon dimensions
              setTimeout(() => {
                setDimensions({
                  width: svg.getAttribute('width'),
                  height: svg.getAttribute('height')
                });
              }, 100);
            });
          }}
        />
      </div>
      <div className={gridThumbDetail}>
        <span className={gridThumbName}>{iconName}</span>
        {dimensions && (
          <span className={gridThumbValue}>
            {dimensions.width} {dimensions.height}
          </span>
        )}
      </div>
    </div>
  );
};

const Icons = () => {
  return (
    <Section heading="Icons">
      {(icons.length && (
        <>
          <div className={classNames(grid, gridIcons)}>
            {icons.map((icon, index) => {
              const { default: iconPath } = icon;
              return <Icon key={index} path={iconPath} />;
            })}
          </div>
        </>
      )) || <p>No icons defined for this project</p>}
    </Section>
  );
};

export default Icons;
