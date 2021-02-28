import React from 'react';
import { devices } from '@app/types/types';

import PrimaryMenu from './PrimaryMenu/PrimaryMenu';
import SecondaryMenu from './SecondaryMenu/SecondaryMenu';
import { navigation } from './Menu.module.scss';

interface MenuInt {
  menuType: devices.MOBILE | devices.DESKTOP;
}

const Menu = React.forwardRef(({ menuType }: MenuInt, ref) => (
  <>
    {(menuType === devices.MOBILE && (
      <nav className={navigation} ref={ref as React.RefObject<HTMLElement>}>
        <PrimaryMenu menuType={menuType} />
        <SecondaryMenu menuType={menuType} />
      </nav>
    )) || <PrimaryMenu menuType={menuType} />}
  </>
));

export default Menu;
