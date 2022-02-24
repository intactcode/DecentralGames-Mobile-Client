import styles from '@/styles/Home.module.scss';

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layoutPosition}>
      {/* <Logo /> */}

      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
