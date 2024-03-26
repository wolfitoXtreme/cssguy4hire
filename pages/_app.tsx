import type { AppProps } from 'next/app';

import '@/styles/global.scss';

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
