import CreateTable from '../components/games/poker/CreateTable';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Create = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | ICE Poker'}
        image={images.SOCIAL_SHARE}
      />

      <CreateTable />
    </Layout>
  );
};

export default Create;
