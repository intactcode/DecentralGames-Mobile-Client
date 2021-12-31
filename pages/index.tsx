import HomePage from '../components/content/HomePage';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import Constants from '../components/common/Constants';
import Images from '../components/common/Images';

const Home = () => {
  return (
    <Layout>
      <Header title={Constants.TITLE} image={Images.SOCIAL_SHARE} />

      <HomePage />
    </Layout>
  );
};

export default Home;
