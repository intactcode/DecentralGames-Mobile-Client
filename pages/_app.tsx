import NextNProgress from 'nextjs-progressbar';
import { Provider } from '../store';
import Segment from '../components/common/Segment';
import Socket from '../socket';
import '../styles/globals.css';
import '../styles/menu.css';

function Application(props: { Component: any; pageProps: any; store: any }) {
  return (
    <Provider store={props.store}>
      <Segment />
      <NextNProgress />

      <props.Component {...props.pageProps} />

      <Socket />
    </Provider>
  );
}

export default Application;
