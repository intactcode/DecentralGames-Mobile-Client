import NextNProgress from 'nextjs-progressbar';
import { Provider } from '../store/Store';
import Socket from '../socket/Socket';
import Segment from '../components/common/Segment';
import Wallet from '../store/Wallet';
import '../styles/globals.css';
import '../styles/menu.css';

function Application(props: { Component: any; pageProps: any; store: any }) {
  return (
    <Provider store={props.store}>
      <Segment />
      <NextNProgress />

      <props.Component {...props.pageProps} />

      <Wallet />
      <Socket />
    </Provider>
  );
}

export default Application;
