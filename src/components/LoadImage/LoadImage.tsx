import React, {
  Children,
  JSXElementConstructor,
  useMemo,
  useState
} from 'react';

const requestImages = require.context(
  '@app/assets/images/',
  false,
  /\.(png|jpe?g|svg)$/
);

interface LoadImageInt {
  source: string;
  text: string;
  className?: string;
  wrapper?: JSX.Element;
}

const Image: React.FC<LoadImageInt> = ({ source, text, className }) => {
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

const Wrapper: React.FC<{
  wrapper: JSX.Element;
  children: React.ReactNode;
}> = ({ wrapper, children }) => {
  const { props } = (wrapper as JSX.Element) || {};
  const propsWithChildren = { ...props, children };
  console.log('wrapper: ', wrapper);
  console.log('test wrapper: ', { ...wrapper, props: propsWithChildren });
  return { ...wrapper, props: propsWithChildren };
};

const LoadImage: React.FC<LoadImageInt> = ({
  source,
  text,
  className,
  wrapper
}) => {
  return (
    <>
      {wrapper ? (
        <Wrapper wrapper={wrapper}>
          <Image source={source} text={text} className={className} />
        </Wrapper>
      ) : (
        <Image source={source} text={text} className={className} />
      )}
    </>
  );
};

export default LoadImage;
