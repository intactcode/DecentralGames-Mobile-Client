import { useEffect, useContext } from 'react';
import { GlobalContext } from './index';
import Web3 from 'web3';

declare const window: any;

function NetworkId() {
  // returns current state paired with dispatch method from Context API
  const [state, dispatch]: any = useContext(GlobalContext);

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
