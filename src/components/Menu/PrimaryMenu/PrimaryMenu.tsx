import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { getNoTouch } from '@app/utils/utils';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import {
  menu,
  menuHeading,
  menuList,
  menuListItem,
  menuListItemLink,
  noTouchEvents,
  menuMain,
  menuMainList,
  menuMainItem,
  menuMainItemLink,
  menuMainItemIcon
} from '@app/components/Menu/Menu.module.scss';
import { devices, sections } from '@app/types/types';

import IconMenu from '../IconMenu/IconMenu';

const PrimaryMenu: React.FC<{ menuType: devices.MOBILE | devices.DESKTOP }> = ({
  menuType
}) => {
  const { formatMessage } = useIntl();
  const {
    navigation: { sections: menuItems }
  } = useContext(MenuContext);

  return (
    <nav className={menuType === devices.MOBILE ? menu : menuMain}>
      <h5 className={menuHeading}>
        {formatMessage({ id: 'menu-title-primary' })}:
      </h5>
      <ul className={menuType === devices.MOBILE ? menuList : menuMainList}>
        {menuItems?.map(({ id }, index) => {
          const text = formatMessage({ id: `menu-${id}` });

          return (
            <React.Fragment key={index}>
              {(menuType === devices.DESKTOP && id !== sections.HOME && (
                <li className={menuMainItem}>
                  <a
                    href={`#${id}`}
                    title={text}
                    tabIndex={-1}
                    className={classNames(menuMainItemLink, {
                      [noTouchEvents]: getNoTouch()
                    })}
                  >
                    <IconMenu icon={id} className={menuMainItemIcon} />
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
