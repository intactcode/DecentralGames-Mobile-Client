import Logo from './Logo';
import styles from '../../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <div className={styles.layoutPosition}>
      <Logo />

      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Layout;
