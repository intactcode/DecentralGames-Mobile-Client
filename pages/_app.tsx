import NextNProgress from 'nextjs-progressbar';
import { Provider } from '../store/Store';
import Socket from '../socket/Socket';
import Segment from '../components/common/Segment';
import UserStatus from '../store/UserStatus';
import NetworkId from '../store/NetworkId';
import '../styles/globals.css';
import '../styles/menu.css';

function Application(props: { Component: any; pageProps: any; store: any }) {
  return (
    <Provider store={props.store}>
      <Socket />
      <Segment />
      <NextNProgress />

      <props.Component {...props.pageProps} />

      <UserStatus />
      <NetworkId />
    </Provider>
  );
}

export default Application;
