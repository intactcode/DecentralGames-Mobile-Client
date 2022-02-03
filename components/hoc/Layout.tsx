import { Box } from '@mui/system';
import Logo from './Logo';
import styles from '../../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <Box style={{ position: 'relative', overflowX: 'hidden' }}>
      <Logo />
      <div className={styles.container}>{props.children}</div>
    </Box>
  );
};

export default Layout;
