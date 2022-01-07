import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';
import { Box } from '@mui/material';
import styles from '../styles/Home.module.css';

const Offline = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Offline'}
        image={images.SOCIAL_SHARE}
      />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>Please connect to the Internet.</Box>
      </Box>
    </Layout>
  );
};

export default Offline;
