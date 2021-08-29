import React, { useEffect, useState } from 'react';

export const InfoOverlayContext = React.createContext<{
  infoActive: boolean;
  setInfoActive: (x: boolean) => void;
  showInfo: boolean;
  setShowInfo: (x: boolean) => void;
  infoShown: boolean;
  setInfoshown: (x: boolean) => void;
}>({
  infoActive: false,
  setInfoActive: () => {},
  showInfo: false,
  setShowInfo: () => {},
  infoShown: false,
  setInfoshown: () => {}
});

export const InfoOverlayProvider: React.FC = ({ children }) => {
  const [infoActive, setInfoActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoShown, setInfoshown] = useState(false);

  useEffect(() => {
    infoActive && setShowInfo(true);
  }, [infoActive]);

  return (
    <InfoOverlayContext.Provider
      value={{
        infoActive,
        setInfoActive,
        showInfo,
        setShowInfo,
        infoShown,
        setInfoshown
      }}
    >
      {children}
    </InfoOverlayContext.Provider>
  );
};
