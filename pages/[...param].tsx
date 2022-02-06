import PageNotFound from '../components/content/PageNotFound/PageNotFound';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Wildcard = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Page Not Found'}
        image={images.SOCIAL_SHARE}
      />

      <PageNotFound />
    </Layout>
  );
};

export default Wildcard;
