import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as IconClose } from '@app/assets/icons/icon-close.svg';

import { closeButton, closeButtonIcon } from './ContactCloseButton.module.scss';

interface ContactCloseButtonInt {
  actions: { (): void }[];
}

const ContactCloseButton: React.FC<ContactCloseButtonInt> = ({ actions }) => {
  const { formatMessage } = useIntl();
  const text = formatMessage({ id: 'nav-close' });

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        actions.map((action) => {
          return action();
        });
      }}
      title={text}
      className={closeButton}
    >
      {text}
      <IconClose className={closeButtonIcon} />
    </button>
  );
};

export default ContactCloseButton;
