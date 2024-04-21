import React, { useState } from 'react';

import classNames from 'classnames';

import IconCopy from '@/stories/assets/icon-copy.svg';
import IconZoom from '@/stories/assets/icon-zoom.svg';

import styles from './SampleItem.module.scss';

interface IWrapper {
  tagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const Wrapper: React.FC<IWrapper> = ({ tagName = 'div', children, ...rest }) =>
  React.createElement(tagName, { ...rest }, children);

export enum EnumSampleVariant {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IHandleMouseEnter {
  (...args: [action: 'copy' | 'zoom']): void;
}

interface ISampleItem {
  tagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  sampleVariant?: EnumSampleVariant.LIGHT | EnumSampleVariant.DARK;
  onCopy?: () => void;
  onZoom?: () => void;
}

const SampleItem: React.FC<ISampleItem> = ({
  tagName,
  children,
  className,
  sampleVariant = EnumSampleVariant.DARK,
  onCopy,
  onZoom,
}) => {
  const [actionText, setActionText] = useState('dummy text here');
  const hasActions = onCopy || onZoom;

  const handleMouseEnter: IHandleMouseEnter = action => {
    if (action === 'copy') {
      setActionText('Click to copy value to the clipboard.');
    }
    if (action === 'zoom') {
      setActionText('Click to enlarge the image.');
    }
  };

  return (
    <Wrapper
      tagName={tagName}
      className={classNames(className, {
        [styles['sample-variant--light']]:
          sampleVariant === EnumSampleVariant.LIGHT,
      })}>
      {children}
      {hasActions && (
        <div className={styles['action-tip']}>
          <p className={styles['action-tip-text']}>{actionText}</p>
          <div className={styles['action-tip-actions']}>
            {onZoom && (
              <IconZoom
                className={styles['action-icon']}
                onMouseEnter={() => handleMouseEnter('zoom')}
                onClick={() => {
                  onZoom();
                }}
              />
            )}
            {onCopy && (
              <IconCopy
                className={styles['action-icon']}
                onMouseEnter={() => handleMouseEnter('copy')}
                onClick={() => {
                  onCopy();
                }}
              />
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default SampleItem;
