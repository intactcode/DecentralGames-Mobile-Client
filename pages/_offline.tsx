import { Layout } from '@/components/common';
import { Header, Images, Constants } from '@/components/common';
import styles from '@/styles/Home.module.scss';

const Offline = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Offline'}
        image={Images.SOCIAL_SHARE}
      />

      <div style={{ position: 'relative', zIndex: 30 }}>
        <div className={styles.playtitle}>Please connect to the Internet.</div>
      </div>
    </Layout>
  );
};

export default Offline;
