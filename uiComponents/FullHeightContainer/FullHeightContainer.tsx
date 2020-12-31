import React from 'react';
import { debounce } from '@utils/toolBelt/debounce';

const getWindowHeight = (): string =>
  ((document &&
    document.documentElement &&
    document.documentElement.clientHeight) ||
    window.innerHeight) + 'px';

export const FullHeightContainer: React.FC = ({ children }): JSX.Element => {
  if (typeof window === 'undefined') {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const [windowHeight, setWindowHeight] = React.useState(getWindowHeight());

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowHeight(getWindowHeight());
    }, 100);

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div style={{ height: windowHeight }}>{children}</div>;
};
