import React, { useState } from 'react';

export const InfoOverlayContext = React.createContext<{
  infoActive: boolean;
  showInfo: (x: boolean) => void;
  infoShown: boolean;
  setInfoshown: (x: boolean) => void;
}>({
  infoActive: false,
  showInfo: () => {},
  infoShown: false,
  setInfoshown: () => {}
});

export const InfoOverlayProvider: React.FC = ({ children }) => {
  const [infoActive, setInfoActive] = useState(false);
  const [infoShown, setInfoshown] = useState(false);

  return (
    <InfoOverlayContext.Provider
      value={{
        infoActive,
        showInfo: setInfoActive,
        infoShown,
        setInfoshown
      }}
    >
      {children}
    </InfoOverlayContext.Provider>
  );
};
