import HomePage from '../components/content/HomePage';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Home = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Decentral Games'}
        image={images.SOCIAL_SHARE}
      />

      <HomePage />
    </Layout>
  );
};

export default Home;
