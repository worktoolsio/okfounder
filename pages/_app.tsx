import { AppProps } from 'next/app';

import { GlobalStyles } from '@uiComponents/GlobalStyles';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  /**
   * If there is a sponsor code in the query params, set it up
   * in the local storage for future use
   */
  if (typeof window !== 'undefined') {
    /**
     * When navigating to a new page, scroll to the
     * top of the said page
     */
    document.body.scrollTo(0, 0);
  }

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
