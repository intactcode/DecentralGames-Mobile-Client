import MenuBar from './MenuBar';
import Aux from './_Aux';
import styles from '../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <Aux>
      <div className={styles.container}>{props.children}</div>

      <MenuBar />
    </Aux>
  );
};

export default Layout;
