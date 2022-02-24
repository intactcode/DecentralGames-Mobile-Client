import PokerGame from '@/components/games/poker/PokerGame';
import Layout from '@/components/common/Layout';
import Header from '@/components/common/Header';
import constants from '@/components/common/Constants';
import images from '@/components/common/Images';

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
