import NextNProgress from 'nextjs-progressbar';
import { Provider } from '@/store/Store';
import { Segment, SpinnerAnimation } from '@/components/common';
import Wallet from '@/store/Wallet';
import Socket from '@/socket/Socket';
import '../styles/base.scss';
import '../styles/globals.css';

interface ApplicationProps {
  Component: any;
  pageProps: any;
  store: any;
}

const Application: React.FC<ApplicationProps> = (props) => {
  const { store, pageProps, Component } = props;
  return (
    <Provider store={store}>
      <Segment />
      <NextNProgress />

      <SpinnerAnimation width={80} height={80} />
      <Component {...pageProps} />

      <Wallet />
      <Socket />
    </Provider>
  );
};

export default Application;
