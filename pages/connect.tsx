import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';
import JoinGameFlow from '../components/content/JoinGameFlow/JoinGameFlow';

const Connect = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Connect'}
        image={images.SOCIAL_SHARE}
      />

      <JoinGameFlow />
    </Layout>
  );
};

export default Connect;
