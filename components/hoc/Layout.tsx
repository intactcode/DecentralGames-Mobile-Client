import styles from '../../styles/Home.module.scss';

const Layout = (props: { children: any }) => {
  return (
    <div className={styles.layoutPosition}>
      {/* <Logo /> */}
      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Layout;
