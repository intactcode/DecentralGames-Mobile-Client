import { Box } from '@mui/system';
import styles from '../../styles/Home.module.css';

const Layout = (props: { children: any }) => {
  return (
    <Box style={{ position: 'relative', overflowX: 'hidden' }}>
      <div className={styles.container}>{props.children}</div>
    </Box>
  );
};

export default Layout;
