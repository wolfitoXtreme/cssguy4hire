import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { ContactFormContext } from '@app/context/ContactFormContext/ContactFormContext';
import { ReactComponent as IconClose } from '@app/assets/icons/icon-close.svg';

import {
  closeButton,
  closeButtonDisabled,
  closeButtonIcon
} from './ContactCloseButton.module.scss';

interface ContactCloseButtonInt {
  actions: { (): void }[];
}

const ContactCloseButton: React.FC<ContactCloseButtonInt> = ({ actions }) => {
  const { enableSubmit } = useContext(ContactFormContext);
  const { formatMessage } = useIntl();
  const text = formatMessage({ id: 'nav-close' });

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        actions.map((action) => {
          return enableSubmit && action();
        });
      }}
      title={text}
      className={classNames(closeButton, {
        [closeButtonDisabled]: !enableSubmit
      })}
    >
      {text}
      <IconClose className={closeButtonIcon} />
    </button>
  );
};

export default ContactCloseButton;
