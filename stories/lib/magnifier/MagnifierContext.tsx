import { createContext, useState } from 'react';

import Magnifier from './Magnifier';

export const MagnifierContext = createContext<{
  hideMagnifier: () => void;
  zoomedComponent: React.ReactNode | null;
  showMagnifier: (component: React.ReactNode, isDark: boolean) => void;
  isDark: boolean;
}>({
  hideMagnifier: () => {},
  zoomedComponent: null,
  showMagnifier: () => {},
  isDark: false,
});

export const MagnifierContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [zoomedComponent, setActiveZoomedComponent] =
    useState<React.ReactNode | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [exitMagnifier, setExitMagnifier] = useState(false);

  const showMagnifierHandler: {
    (component: React.ReactNode, isDark: boolean): void;
  } = (component, isDark) => {
    setIsDark(isDark);
    setActiveZoomedComponent(component);
  };

  const hideMagnifierHandler = () => {
    setExitMagnifier(false);
    setActiveZoomedComponent(null);
  };

  const context = {
    hideMagnifier: hideMagnifierHandler,
    zoomedComponent,
    showMagnifier: showMagnifierHandler,
    isDark,
  };

  return (
    <MagnifierContext.Provider value={context}>
      {children} - isDark = {isDark.toString()}
      <Magnifier
        component={context.zoomedComponent || null}
        exitMagnifier={exitMagnifier}
        isDark={context.isDark}
      />
    </MagnifierContext.Provider>
  );
};
