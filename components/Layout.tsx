import Footer from './Footer';
import Aux from './_Aux';
import styles from '../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <Aux>
      <div className={styles.container}>{props.children}</div>

      <Footer />
    </Aux>
  );
};

export default Layout;
