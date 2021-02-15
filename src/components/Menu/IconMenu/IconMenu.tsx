import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { menuListItemIcon } from '@app/components/Menu/Menu.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
  show?: boolean;
}

const IconMenu: React.FC<IconProps> = ({ icon, show = true }) => {
  const ImportedIconRef = React.useRef<
    React.FC<React.SVGProps<SVGSVGElement>>
  >();

  const [loading, setLoading] = React.useState(false);

  useEffect((): void => {
    setLoading(true);

    const importIcon = async (): Promise<void> => {
      try {
        const { default: test } = await import(
          `@app/assets/icons/icon-${icon}.svg`
        );
        ImportedIconRef.current = test;
      } catch (err) {
        console.error('no file found\n', err);
        return;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [icon]);

  if (!loading && ImportedIconRef.current && show) {
    const { current: importedIcon } = ImportedIconRef;
    console.log('ImportedIcon: ', importedIcon, typeof importedIcon);
    return (
      <ReactSVG src={importedIcon.toString()} className={menuListItemIcon} />
    );
  }

  return null;
};

export default IconMenu;
