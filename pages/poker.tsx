import PokerGame from '@/components/games/poker/PokerGame';
import { Layout, Header, Constants, Images } from '@/components/common';

const Poker: React.FC = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | ICE Poker'}
        image={Images.SOCIAL_SHARE}
      />

      <PokerGame />
    </Layout>
  );
};

export default Poker;
