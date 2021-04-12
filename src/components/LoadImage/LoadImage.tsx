import React, { useState } from 'react';

const requestImages = require.context(
  '@app/assets/images/',
  false,
  /\.(png|jpe?g|svg)$/
);

const LoadImage: React.FC<{
  source: string;
  text: string;
  className?: string;
}> = ({ source, text, className }) => {
  const [imageFile, setImageFile] = useState('');

  const getImage = (image: string) => {
    const result = async (
      image: string
    ): Promise<{ [key: string]: string }> => {
      return await requestImages(`./${image}`);
    };

    result(image)
      .then((value) => {
        setImageFile(value.default);
        return value;
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log('Error loading Image:', error);
      });

    return result;
  };

  getImage(source);

  return <img src={imageFile} alt={text} title={text} className={className} />;
};

export default LoadImage;
