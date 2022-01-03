import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../store';
import { useRouter } from 'next/router';

const Segment = () => {
  // returns current state paired with dispatch method from Context API
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GlobalContext);

  // define local variables
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('User status: ' + state.userStatus);
  }, [state.userStatus]);

  // Segment: send current page data
  useEffect(() => {
    analytics.page(document.title, {});
  }, [router.pathname]);

  return null;
};

export default Segment;
