import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStoreState } from '../../store/Hooks';

declare const window: any;

const Segment = () => {
  const state = useStoreState(); // returns current state from Context API store

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