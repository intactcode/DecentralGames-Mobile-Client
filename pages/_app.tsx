import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import Aux from '../components/_Aux';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Aux>
      <NextNProgress />

      <Component {...pageProps} />
    </Aux>
  );
}

export default MyApp;
