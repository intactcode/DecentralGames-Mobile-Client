import { useEffect } from 'react';
import Web3 from 'web3';
import { useStoreDispatch } from './hooks';

declare const window: any;

function NetworkId() {
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum); // pass MetaMask provider to Web3 constructor

      (async () => {
        const networkId = await web3.eth.net.getId();

        console.log('Network Id: ' + networkId);

        dispatch({
          type: 'network_id',
          data: networkId,
        });
      })();
    }
  }, [dispatch]);

  return null;
}

export default NetworkId;
