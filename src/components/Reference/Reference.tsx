import React from 'react';

import Typography from './Typography/Typography';
import Colors from './Colors/Colors';
import Images from './Images/Images';
import Icons from './Icons/Icons';
import Forms from './Forms/Forms';
import { reference } from './Reference.module.scss';

const applyBodyStyles = (classNames) => document.body.classList.add(classNames);

const Reference: React.FC = () => {
  applyBodyStyles(reference);

  return (
    <>
      <Typography />
      <Colors />
      <Images />
      <Icons />
      <Forms />
    </>
  );
};

export default Reference;
