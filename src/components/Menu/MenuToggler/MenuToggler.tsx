import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';
import { ReactComponent as IconNav } from '@app/assets/icons/icon-nav.svg';
import { ReactComponent as IconNavHover } from '@app/assets/icons/icon-nav-hover.svg';
import { ReactComponent as IconNavClose } from '@app/assets/icons/icon-nav-close.svg';
import { ReactComponent as IconNavCloseHover } from '@app/assets/icons/icon-nav-close-hover.svg';

import {
  toggler,
  togglerIsOpen,
  togglerIsHover,
  togglerIcon,
  togglerIconHover,
  togglerIconClose,
  togglerIconCloseHover
} from './MenuToggler.module.scss';

const MenuToggler: React.FC = () => {
  const { formatMessage } = useIntl();
  const { toggleMenu, menuIsOpen } = useContext(NavigationContext);
  const [isHover, setIsHover] = useState(false);
  const text = formatMessage({ id: 'menu' });

  return (
    <button
      onClick={() => {
        toggleMenu(!menuIsOpen);
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      title={text}
      className={classNames(toggler, {
        [togglerIsHover]: isHover,
        [togglerIsOpen]: menuIsOpen
      })}
    >
      {text}
      <IconNav className={togglerIcon} />
      <IconNavHover className={classNames(togglerIcon, togglerIconHover)} />
      <IconNavClose className={classNames(togglerIcon, togglerIconClose)} />
      <IconNavCloseHover
        className={classNames(
          togglerIcon,
          togglerIconClose,
          togglerIconCloseHover
        )}
      />
    </button>
  );
};

export default MenuToggler;
