import NextNProgress from 'nextjs-progressbar';
import { Provider } from '../store';
// import Segment from '../components/analytics/Segment';
import UserStatus from '../store/UserStatus';
import NetworkId from '../store/NetworkId';
import '../styles/globals.css';
import '../styles/menu.css';

function Application(props: { Component: any; pageProps: any; store: any }) {
  return (
    <Provider store={props.store}>
      <NextNProgress />
      {/* <Segment /> */}

      <props.Component {...props.pageProps} />

      <UserStatus />
      <NetworkId />
    </Provider>
  );
}

export default Application;
