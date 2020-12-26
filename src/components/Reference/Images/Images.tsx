import React, { useRef, useState } from 'react';
import { importAll } from '@app/utils/utils';
import Section from '@app/components/Reference/Section/Section';
import classNames from 'classnames';
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

const Image: React.FC<{ imageFile: string }> = ({ imageFile }) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const fileName = imageFile.replace(
    /(\/static\/media\/)([a-z0-9-]+)(.[a-z0-9]+)(.[a-z]+)/,
    '$2$4'
  );
  const imageName = fileName.replace(/([a-z0-9-]+)(.[a-z]+)/, '$1');

  const handleSize = (imageRef) => {
    if (imageRef.current !== null) {
      setDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  return (
    <div className={gridItem}>
      <div className={classNames(gridThumb, gridThumbImage)}>
        <img
          ref={imageRef}
          src={imageFile}
          alt="tex text"
          onLoad={() => handleSize(imageRef)}
          className={gridThumbImg}
        />
      </div>
      <div className={gridThumbDetail}>
        <span className={gridThumbName}>{imageName}</span>
        <span className={gridThumbValue}>({fileName})</span>
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
              const { default: imageFile } = image;
              return <Image key={index} imageFile={imageFile} />;
            })}
          </div>
          <pre>{JSON.stringify(images, null, 2)}</pre>
        </>
      )) || <p>No images defined for this project</p>}
    </Section>
  );
};

export default Images;
