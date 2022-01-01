import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../store';
import Web3 from 'web3';
import { Box } from '@mui/material';
import Image from 'next/image';
import Fetch from '../../api/Fetch';
import styles from '../../styles/Home.module.css';

declare const window: any;

const assignToken = async (accountSwitch = false) => {
  const userAddress = window.ethereum?.selectedAddress;

  if (userAddress && document.visibilityState === 'visible') {
    const timestamp = Date.now();

    const msg = window.web3.utils.utf8ToHex(
      `Decentral Games Login\nTimestamp: ${timestamp}`
    );
    const signature = await window.web3.eth.personal.sign(
      msg,
      window.ethereum?.selectedAddress,
      null
    );

    // console.log('signature: ' + signature);
    // console.log('timestamp...');
    // console.log(timestamp);

    // get JWT token
    const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

    // const token = await call(
    //   `${API_BASE_URL}/authentication/getWebAuthToken?address=${userAddress}&signature=${signature}&timestamp=${timestamp}`,
    //   'GET',
    //   false
    // );

    // console.log('token...');
    // console.log(token);

    localStorage.setItem('token', token);
    localStorage.setItem(
      'expiretime',
      Number(timestamp / 1000 + 12 * 3600).toString()
    );

    if (accountSwitch) {
      window.location.reload();
    }
  }
};

const ButtonLogin = () => {
  // returns current state paired with dispatch method from Context API
  const [state, dispatch]: any = useContext(GlobalContext);

  // define local variables
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);

  let userAddress = '';

  // const window: any = {};

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // get network ID
  // const assignToken = async (accountSwitch = false) => {
  //   const userAddress = window.ethereum?.selectedAddress;

  //   if (userAddress && document.visibilityState === 'visible') {
  //     const timestamp = Date.now();

  //     const msg = window.web3.utils.utf8ToHex(
  //       `Decentral Games Login\nTimestamp: ${timestamp}`
  //     );
  //     const signature = await window.web3.eth.personal.sign(
  //       msg,
  //       window.ethereum?.selectedAddress,
  //       null
  //     );

  //     // console.log('signature: ' + signature);
  //     // console.log('timestamp...');
  //     // console.log(timestamp);

  //     // get JWT token
  //     const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

  //     // const token = await call(
  //     //   `${API_BASE_URL}/authentication/getWebAuthToken?address=${userAddress}&signature=${signature}&timestamp=${timestamp}`,
  //     //   'GET',
  //     //   false
  //     // );

  //     // console.log('token...');
  //     // console.log(token);

  //     localStorage.setItem('token', token);
  //     localStorage.setItem(
  //       'expiretime',
  //       Number(timestamp / 1000 + 12 * 3600).toString()
  //     );

  //     if (accountSwitch) {
  //       window.location.reload();
  //     }
  //   }
  // };

  useEffect(() => {
    if (window.ethereum) {
      setMetamaskEnabled(true);
      window.web3 = new Web3(window.ethereum); // pass MetaMask provider to Web3 constructor

      (async () => {
        const networkID = await window.web3.eth.net.getId();

        dispatch({
          type: 'network_id',
          data: networkID,
        });
      })();

      window.addEventListener('load', function () {
        if (window.ethereum?.selectedAddress) {
          dispatch({
            type: 'user_address',
            data: window.ethereum?.selectedAddress,
          });
        }
        window.ethereum.on('accountsChanged', () => {
          if (window.ethereum?.selectedAddress) {
            dispatch({
              type: 'user_address',
              data: window.ethereum?.selectedAddress,
            });
            assignToken(true);
          }
        });
        window.ethereum.on('close', () => {
          window.location.reload();
        });
      });
    } else {
      setMetamaskEnabled(false);
    }
  }, [dispatch]);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper functions
  async function updateStatus(value: any, post: boolean) {
    if (post) {
      console.log('Posting user status to db: ' + value);

      // update user status in database
      await Fetch.REGISTER('');

      // update global state user status after fetch is complete
      dispatch({
        type: 'update_status',
        data: value,
      });
    } else {
      // update global state user status immediately
      dispatch({
        type: 'update_status',
        data: value,
      });
    }
  }

  const disconnect = () => {
    dispatch({
      type: 'user_address',
      data: '',
    });
  };

  async function getUserStatus() {
    console.log('Get user status: HomePage');

    try {
      const jsonStatus = await Fetch.USER_STATUS();

      if (!jsonStatus.status) return false;

      return jsonStatus.status;
    } catch {
      console.log('Unregistered wallet: HomePage');

      return false;
    }
  }

  async function openMetaMask() {
    if (metamaskEnabled) {
      // open MetaMask for login then get the user's wallet address

      await window?.ethereum.enable();

      userAddress = window.ethereum?.selectedAddress;

      // track MetaMask connect event
      // analytics.track('Connected MetaMask', {
      //   userAddress: userAddress,
      // });
      // console.log(userAddress);

      assignToken();

      // dispatch user address to the Context API store
      dispatch({
        type: 'user_address',
        data: userAddress,
      });

      // set global user status based on value stored in database
      // if new wallet update user status to 4 both locally and in the database
      // (/websiteLogin API call will return error with new wallet address)
      const response = await getUserStatus();

      if (response) {
        updateStatus(response, false);
      } else {
        updateStatus(4, true);
      }
    }
  }

  const ellipsis = state.userAddress
    ? state.userAddress.substring(0, 4) +
      '....' +
      state.userAddress.substring(state.userAddress.length - 4)
    : '';

  return (
    <Box
      className={styles.connectWallet}
      onClick={() => (state.userAddress ? disconnect() : openMetaMask())}
    >
      <Image
        src="/images/home/metamask.png"
        alt="metamask"
        width={35}
        height={35}
      />
      <Box>{!state.userAddress ? 'Connect Your Wallet' : ellipsis}</Box>
    </Box>
  );
};

export default ButtonLogin;
