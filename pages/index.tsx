import HomePage from '../components/content/HomePage';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Constants from '../components/Constants';
import Images from '../components/Images';

const Home = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE}
        description={Constants.DESCRIPTION}
        image={Images.SOCIAL_SHARE}
      />

      <HomePage />

      <Footer />
    </Layout>
  );
};

export default Home;
