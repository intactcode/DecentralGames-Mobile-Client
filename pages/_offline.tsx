import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';
import styles from '../styles/Home.module.css';

const Offline = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Offline'}
        image={images.SOCIAL_SHARE}
      />

      <div position="relative" zIndex={30}>
        <div className={styles.playtitle}>Please connect to the Internet.</div>
      </div>
    </Layout>
  );
};

export default Offline;
