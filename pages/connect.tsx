import { Layout, Header, Constants, Images } from '@/components/common';
import { JoinGameFlow } from '@/components/content';

const Connect = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Connect'}
        image={Images.SOCIAL_SHARE}
      />

      <JoinGameFlow />
    </Layout>
  );
};

export default Connect;
