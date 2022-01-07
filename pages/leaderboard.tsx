import DailyLeaderboard from '../components/content/DailyLeaderboard';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Leaderboard = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Daily Leaderboard'}
        image={images.SOCIAL_SHARE}
      />

      <DailyLeaderboard />
    </Layout>
  );
};

export default Leaderboard;
