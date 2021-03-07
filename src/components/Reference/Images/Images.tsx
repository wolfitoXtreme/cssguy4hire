import React, { useRef, useState } from 'react';

import classNames from 'classnames';

import { importAll, getFileName } from '@app/utils/utils';
import Section from '@app/components/Reference/Section/Section';

import {
  grid,
  gridItem,
  gridThumb,
  gridThumbDetail,
  gridThumbName,
  gridThumbValue
} from '@app/components/Reference/Reference.module.scss';

import { gridImages, gridThumbImage, gridThumbImg } from './Images.module.scss';

const images = importAll(
  require.context('@app/assets/images/', false, /\.(png|jpe?g|svg)$/)
);

const Image: React.FC<{ path: string }> = ({ path }) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSize = (imageRef) => {
    if (imageRef.current !== null) {
      setDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  const { file: imageFile, fileName: imageName } = getFileName(path);

  return (
    <div className={gridItem}>
      <div className={classNames(gridThumb, gridThumbImage)}>
        <img
          ref={imageRef}
          src={path}
          alt="tex text"
          onLoad={() => handleSize(imageRef)}
          className={gridThumbImg}
        />
      </div>
      <div className={gridThumbDetail}>
        <span className={gridThumbName}>{imageName}</span>
        <span className={gridThumbValue}>({imageFile})</span>
        <span className={gridThumbValue}>
          {dimensions.width}px {dimensions.height}px
        </span>
      </div>
    </div>
  );
};

const Images: React.FC = () => {
  return (
    <Section heading="Images">
      {(images.length && (
        <>
          <div className={classNames(grid, gridImages)}>
            {images.map((image, index) => {
              const { default: imageFilePath } = image;
              return <Image key={index} path={imageFilePath} />;
            })}
          </div>
        </>
      )) || <p>No images defined for this project</p>}
    </Section>
  );
};

export default Images;
