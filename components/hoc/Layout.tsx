import Logo from './Logo';
import styles from '../../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <Logo />

      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Layout;
