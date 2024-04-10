import React from 'react';

import classNames from 'classnames';

import IconCopy from '@/stories/assets/icon-copy.svg';

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

interface ISampleItem {
  tagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  sampleVariant?: EnumSampleVariant.LIGHT | EnumSampleVariant.DARK;
  onCopy?: () => void;
}

const SampleItem: React.FC<ISampleItem> = ({
  tagName,
  children,
  className,
  sampleVariant = EnumSampleVariant.LIGHT,
  onCopy,
}) => {
  return (
    <Wrapper
      onClick={() => {
        onCopy && onCopy();
      }}
      tagName={tagName}
      className={classNames(className, {
        [styles['sample-variant--dark']]:
          sampleVariant === EnumSampleVariant.DARK,
      })}>
      {children}
      {onCopy && (
        <div className={styles['copy-tip']}>
          <p className={styles['copy-tip-text']}>
            Click to copy value to the clipboard.
          </p>{' '}
          <IconCopy className={styles['copy-tip-icon']} />
        </div>
      )}
    </Wrapper>
  );
};

export default SampleItem;
