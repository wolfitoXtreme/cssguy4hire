import React from 'react';
import { buttonGroup } from '@app/components/Form/Button/Button.module.scss';

const ButtonGroup: React.FC = ({ children }) => (
  <div className={buttonGroup}>{children}</div>
);

export default ButtonGroup;
