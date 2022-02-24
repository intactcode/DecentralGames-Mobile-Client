import { PageNotFound } from '@/components/content';
import { Layout, Header, Constants, Images } from '@/components/common';

const Wildcard = () => {
  return (
    <Layout>
      <Header
        title={Constants.TITLE + ' | Page Not Found'}
        image={Images.SOCIAL_SHARE}
      />

      <PageNotFound />
    </Layout>
  );
};

export default Wildcard;
