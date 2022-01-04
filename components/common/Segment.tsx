import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStoreState } from '../../store/hooks';

declare const window: any;

const Segment = () => {
  // get user status from the Context API store
  const state = useStoreState();

  // define local variables
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('User status: ' + state.userStatus);
  }, [state.userStatus]);

  // send current page data to Segment analytics
  useEffect(() => {
    window.analytics.page(document.title, {});
  }, [router.pathname]);

  return null;
};

export default Segment;
