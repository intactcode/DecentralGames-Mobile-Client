import JoinGame from '../components/games/JoinGame';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Join = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Join ICE Poker'}
        image={images.SOCIAL_SHARE}
      />

      <JoinGame gameType={'poker'} />
    </Layout>
  );
};

export default Join;
