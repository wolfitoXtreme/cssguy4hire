import React, { useEffect } from 'react';

import Typography from './Typography/Typography';
import Colors from './Colors/Colors';
import { reference } from './Reference.module.scss';

interface ReferenceInt {
  setBodyStyles?: (...args: any[]) => void;
}

const Reference: React.FC<ReferenceInt> = ({ setBodyStyles }) => {
  useEffect(() => {
    setBodyStyles && setBodyStyles(reference);
  }, [setBodyStyles]);

  return (
    <>
      <Typography />
      <Colors />
    </>
  );
};

export default Reference;
