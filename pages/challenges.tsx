import ICEChallenges from '../components/content/ICEChallenges';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Challenges = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | ICE Challenges'}
        image={images.SOCIAL_SHARE}
      />

      <ICEChallenges />
    </Layout>
  );
};

export default Challenges;
