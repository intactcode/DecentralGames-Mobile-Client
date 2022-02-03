import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';
import ConnectWallet from '../components/content/ConnectWallet/ConnectWallet';


const Connect = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Connect'}
        image={images.SOCIAL_SHARE}
      />

      <ConnectWallet />
    </Layout>
  );
};

export default Connect;