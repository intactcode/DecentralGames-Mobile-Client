import PlayerStats from '../components/content/PlayerStats';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Stats = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Player Statistics'}
        image={images.SOCIAL_SHARE}
      />

      <PlayerStats />
    </Layout>
  );
};

export default Stats;
