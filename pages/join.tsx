import JoinTable from '../components/games/poker/JoinTable';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Join = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Join Table'}
        image={images.SOCIAL_SHARE}
      />

      <JoinTable />
    </Layout>
  );
};

export default Join;
