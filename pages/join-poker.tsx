import JoinGame from '@/components/games/JoinGame';
import { Layout, Header, Constants, Images } from '@/components/common';

const Join: React.FC = () => {
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
