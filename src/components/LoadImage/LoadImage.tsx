import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

const requestImages = require.context(
  '@app/assets/images/',
  false,
  /\.(png|jpe?g|svg)$/
);

interface LoadImageInt {
  source: string;
  text: string;
  className?: string;
  svgInline?: boolean;
  wrapper?: JSX.Element;
}

const Image: React.FC<LoadImageInt> = ({
  source,
  text,
  className,
  svgInline
}) => {
  const [imageFile, setImageFile] = useState('');
  const isSVG = /.svg/.test(source);

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

  if (isSVG && svgInline) {
    return <ReactSVG src={imageFile} className={className} />;
  } else if (!isSVG && svgInline) {
    // eslint-disable-next-line no-console
    console.error('Bitmap Images cannot be injected inline.');
    return <></>;
  } else {
    return (
      <img src={imageFile} alt={text} title={text} className={className} />
    );
  }
};

const Wrapper: React.FC<{
  wrapper: JSX.Element;
  children: React.ReactNode;
}> = ({ wrapper, children }) => {
  const { props } = (wrapper as JSX.Element) || {};
  const propsWithChildren = { ...props, children };

  return { ...wrapper, props: propsWithChildren };
};

const LoadImage: React.FC<LoadImageInt> = ({
  source,
  text,
  className,
  wrapper,
  svgInline = false
}) => {
  return (
    <>
      {wrapper ? (
        <Wrapper wrapper={wrapper}>
          <Image
            source={source}
            text={text}
            className={className}
            svgInline={svgInline}
          />
        </Wrapper>
      ) : (
        <Image
          source={source}
          text={text}
          className={className}
          svgInline={svgInline}
        />
      )}
    </>
  );
};

export default LoadImage;
