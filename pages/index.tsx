import { HomePage } from '@/components/content';
import { Layout, Header, Constants, Images } from '@/components/common';

const Home = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Decentral Games'}
        image={Images.SOCIAL_SHARE}
      />

      <HomePage />
    </Layout>
  );
};

export default Home;
