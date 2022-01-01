import NextNProgress from 'nextjs-progressbar';
import { Provider } from '../store';
import Segment from '../components/analytics/Segment';
import UserStatus from '../store/UserStatus';
import '../styles/globals.css';
import '../styles/menu.css';

function Application(props: { Component: any; pageProps: any; store: any }) {
  return (
    <Provider store={props.store}>
      <NextNProgress />
      <Segment />

      <props.Component {...props.pageProps} />

      <UserStatus />
    </Provider>
  );
}

export default Application;
