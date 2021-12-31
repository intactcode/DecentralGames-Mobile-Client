import Game from '../components/game/';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import Constants from '../components/common/Constants';
import Images from '../components/common/Images';

const Gameplay = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Gameplay '}
        image={Images.SOCIAL_SHARE}
      />

      <Game />
    </Layout>
  );
};

export default Gameplay;
