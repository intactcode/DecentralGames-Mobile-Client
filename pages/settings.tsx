import UserSettings from '../components/content/UserSettings';
import Layout from '../components/hoc/Layout';
import Header from '../components/hoc/Header';
import constants from '../components/common/Constants';
import images from '../components/common/Images';

const Settings = () => {
  return (
    <Layout>
      <Header
        title={constants.TITLE + ' | Settings'}
        image={images.SOCIAL_SHARE}
      />

      <UserSettings />
    </Layout>
  );
};

export default Settings;
