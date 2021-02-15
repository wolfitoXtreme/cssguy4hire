import React, { useContext } from 'react';
import classNames from 'classnames';
import { getNoTouch } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import {
  menu,
  menuHeading,
  menuList,
  menuListItem,
  menuListItemLink,
  noTouchEvents
} from '@app/components/Menu/Menu.module.scss';
import { useIntl } from 'react-intl';
import { devices, sections } from '@app/types/types';

import IconMenu from '../IconMenu/IconMenu';

const PrimaryMenu: React.FC<{ menuType: devices.MOBILE | devices.DESKTOP }> = ({
  menuType
}) => {
  const { formatMessage } = useIntl();
  const { sections: menuItems } = useContext(MenuContext);

  return (
    <nav className={menu}>
      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-primary' })}:
      </h5>
      <ul className={menuList}>
        {menuItems?.map(({ id }, index) => {
          const text = formatMessage({ id: `menu-${id}` });

          return (
            <React.Fragment key={index}>
              {(menuType === devices.DESKTOP && id !== sections.HOME && (
                <li className={menuListItem}>
                  <a
                    href={`#${id}`}
                    title={text}
                    tabIndex={-1}
                    className={classNames(menuListItemLink, {
                      [noTouchEvents]: getNoTouch()
                    })}
                  >
                    {id !== sections.HOME && <IconMenu icon={id} />}
                    <strong>{text}</strong>
                  </a>
                </li>
              )) ||
                (menuType === devices.MOBILE && (
                  <li className={menuListItem}>
                    <a
                      href={`#${id}`}
                      title={text}
                      tabIndex={-1}
                      className={classNames(menuListItemLink, {
                        [noTouchEvents]: getNoTouch()
                      })}
                    >
                      <strong>{text}</strong>
                    </a>
                  </li>
                ))}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default PrimaryMenu;
