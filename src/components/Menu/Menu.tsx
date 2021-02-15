import React from 'react';
import { devices } from '@app/types/types';

import PrimaryMenu from './PrimaryMenu/PrimaryMenu';
import SecondaryMenu from './SecondaryMenu/SecondaryMenu';
import { navigation } from './Menu.module.scss';

interface MenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
}

const Menu: React.FC<MenuInt> = ({ menuType }) => (
  <>
    {(menuType === devices.MOBILE && (
      <nav className={navigation}>
        <PrimaryMenu menuType={menuType} />
        <SecondaryMenu />
      </nav>
    )) || <PrimaryMenu menuType={menuType} />}
  </>
);

export default Menu;
