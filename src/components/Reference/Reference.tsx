import React from 'react';

import { reference } from './Reference.module.scss';
import Typography from './Typography/Typography';

interface ReferenceInt {
  setBodyStyles?: (...args: any[]) => void;
}

const Reference: React.FC<ReferenceInt> = ({ setBodyStyles }) => {
  const test = ['a', 'b'];
  const testB = {
    a: 'a',
    b: 'b'
  };
  setBodyStyles && setBodyStyles(reference);
  return <Typography />;
};

export default Reference;
