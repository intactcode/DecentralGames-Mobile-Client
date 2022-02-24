import { JoinGame } from '@/components/games/poker';
import { Layout, Header, Constants, Images } from '@/components/common';

const Join = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Join ICE Poker'}
        image={Images.SOCIAL_SHARE}
      />

      <JoinGame gameType={'poker'} />
    </Layout>
  );
};

export default Join;
