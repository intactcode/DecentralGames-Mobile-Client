import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStoreState } from '@/hooks/Hooks';

declare const window: any;

const Segment: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('User status: ' + state.userStatus);
  }, [state.userStatus]);

  // send current page data to Segment analytics
  useEffect(() => {
    if (window.analytics) {
      window.analytics.page(document.title, {});
    }
  }, [router.pathname]);

  return null;
};

export default Segment;
