import { useEffect } from 'react';
import { Box } from '@mui/material';
import Web3 from 'web3';
import Image from 'next/image';
import Fetch from '../../api/Fetch';
import styles from '../../styles/Home.module.css';
import { useStoreDispatch, useStoreState } from '../../store/hooks';

declare const window: any;

const assignToken = async (web3: any, accountSwitch = false) => {
  const userAddress = window.ethereum?.selectedAddress;

  if (userAddress && document.visibilityState === 'visible') {
    const timestamp = Date.now();

    const msg = web3.utils.utf8ToHex(
      `Decentral Games Login\nTimestamp: ${timestamp}`
    );
    const signature = await web3.eth.personal.sign(
      msg,
      window.ethereum?.selectedAddress,
      null
    );

    // get JWT token
    const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

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

const ButtonLogin = (props: { page: string }) => {
  // returns current state paired with dispatch method from Context API
  const dispatch = useStoreDispatch();
  const state = useStoreState();

  // let userAddress = '';

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  // if user switches accounts re-assign JWT token
  useEffect(() => {
    window.addEventListener('load', function () {
      if (window.ethereum?.selectedAddress) {
        dispatch({
          type: 'user_address',
          data: window.ethereum?.selectedAddress,
        });
      }

      window.ethereum.on('accountsChanged', () => {
        console.log('Account changed');

        if (window.ethereum?.selectedAddress) {
          dispatch({
            type: 'user_address',
            data: window.ethereum?.selectedAddress,
          });

          assignToken(new Web3(window.ethereum), true); // assing JWT authentication token
        }
      });

      window.ethereum.on('disconnect', () => {
        window.location.reload();
      });
    });
  }, [dispatch]);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper functions

  const disconnect = () => {
    dispatch({
      type: 'update_status',
      data: 0,
    });
  };

  async function getUserStatus() {
    console.log('Get user status: ' + props.page);

    try {
      const jsonStatus = await Fetch.USER_STATUS();

      if (!jsonStatus.status) return false;

      return jsonStatus.status;
    } catch (error) {
      console.log('Unregistered wallet: ' + props.page);
      console.log(error);

      return false;
    }
  }

  async function updateStatus(value: number, post: boolean) {
    if (post) {
      console.log('Posting user status to db: ' + value);

      await Fetch.REGISTER(''); // update user status in database

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

  async function openMetaMask() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // open MetaMask for login then get the user's wallet address

      // userAddress = window.ethereum?.selectedAddress;

      // Segment: track MetaMask connect event
      // window.analytics.track('Connected MetaMask: ' + props.page, {
      //   userAddress: userAddress,
      // });

      // set user status to 3 to denote fetching user status
      dispatch({
        type: 'update_status',
        data: 3,
      });

      await assignToken(new Web3(window.ethereum)); // assing JWT authentication token

      // set global user status based on value stored in database
      // if new wallet update user status to 4 both locally and in the database
      // (/websiteLogin API call will return error with unregistered wallet address)
      const response = await getUserStatus();

      if (response) {
        updateStatus(response, false);
      } else {
        updateStatus(4, true);
      }
    }
  }

  // write the user's wallet address with ellipsis added
  const ellipsis = state.userAddress
    ? state.userAddress.substring(0, 4) +
      '....' +
      state.userAddress.substring(state.userAddress.length - 4)
    : '';

  return (
    <Box
      className={styles.connectWallet}
      onClick={() => (state.userStatus >= 4 ? disconnect() : openMetaMask())}
    >
      <Image
        src="/images/home/metamask.png"
        alt="metamask"
        width={35}
        height={35}
      />
      <Box>
        {(state.userStatus < 3 ? 'Connect Your Wallet' : state.userStatus === 3)
          ? 'Connecting'
          : ellipsis}
      </Box>
    </Box>
  );
};

export default ButtonLogin;
