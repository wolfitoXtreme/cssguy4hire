import React from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { ReactComponent as IconClose } from '@app/assets/icons/icon-close.svg';
import { ReactComponent as IconCloseInv } from '@app/assets/icons/icon-close-inv.svg';

import {
  closeButton,
  closeButtonSmall,
  closeButtonDisabled,
  closeButtonIcon
} from './CloseButton.module.scss';

interface CloseButtonInt {
  actions: { (): void }[];
  variant?: 'small';
  iconType?: 'normal' | 'inverted';
  className?: string;
  enable?: boolean;
}

const CloseButton: React.FC<CloseButtonInt> = ({
  variant,
  iconType = 'normal',
  className,
  actions,
  enable = true
}) => {
  const { formatMessage } = useIntl();
  const text = formatMessage({ id: 'nav-close' });

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        actions.map((action) => {
          return enable && action();
        });
      }}
      title={text}
      className={classNames(className, closeButton, {
        [closeButtonSmall]: variant === 'small',
        [closeButtonDisabled]: !enable
      })}
    >
      {text}
      {iconType === 'normal' ? (
        <IconClose className={closeButtonIcon} />
      ) : (
        <IconCloseInv className={closeButtonIcon} />
      )}
    </button>
  );
};

export default CloseButton;
