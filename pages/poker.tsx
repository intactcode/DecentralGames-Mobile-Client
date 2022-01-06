import PokerGame from '../components/games/PokerGame';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import Constants from '../components/common/Constants';
import Images from '../components/common/Images';

const Poker = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | ICE Poker '}
        image={Images.SOCIAL_SHARE}
      />

      <PokerGame />
    </Layout>
  );
};

export default Poker;
