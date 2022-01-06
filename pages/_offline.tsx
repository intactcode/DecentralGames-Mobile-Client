import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import Constants from '../components/common/Constants';
import Images from '../components/common/Images';
import styles from '../styles/Home.module.css';

const Offline = () => {
  return (
    <Layout>
      <Header title={Constants.TITLE} image={Images.SOCIAL_SHARE} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          You are offline. Please connect to the Internet
        </h1>
      </main>
    </Layout>
  );
};

export default Offline;
