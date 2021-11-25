import HomePage from './components/HomePage';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';


const Home = () => {
  return (
    <Layout>
      <Header
        title={'Mobile ICE | Decentral Games'}
        description={'Mobile ICE | Decentral Games'}
        // image={''}
      />

      <HomePage />

      <Footer />
    </Layout>
  );
};

export default Home;
