import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
}

const IconMenu: React.FC<IconProps> = ({ icon, className }) => {
  const ImportedIconRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement>>
  >();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const importIcon = async (): Promise<void> => {
      try {
        const { default: defaultImport } = await import(
          `@app/assets/icons/icon-${icon}.svg`
        );
        ImportedIconRef.current = defaultImport;
      } catch (err) {
        return;
      } finally {
        setLoading(false);
      }
    };

    importIcon();
  }, [icon]);

  if (!loading && ImportedIconRef.current) {
    const { current: importedIcon } = ImportedIconRef;

    return <ReactSVG src={importedIcon.toString()} className={className} />;
  }

  return null;
};

export default IconMenu;
