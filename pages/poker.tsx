import PokerGame from '../components/games/PokerGame';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Poker = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | ICE Poker'}
        image={images.SOCIAL_SHARE}
      />

      <PokerGame />
    </Layout>
  );
};

export default Poker;
