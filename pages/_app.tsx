import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head'
import type { AppProps } from 'next/app';
import Aux from '../components/_Aux';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Aux>
      <NextNProgress />
      <Head >
      </Head>
      <Component {...pageProps} />
    </Aux>
  );
}

export default MyApp;
