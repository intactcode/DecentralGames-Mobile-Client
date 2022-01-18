import { useEffect } from 'react';
import { Box } from '@mui/material';
import Web3 from 'web3';
import Image from 'next/image';
import Fetch from '../../api/Fetch';
import styles from '../../styles/Home.module.css';
import { useStoreDispatch, useStoreState } from '../../store/Hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';

declare const window: any;

const ButtonLogin = (props: { page: string }) => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  const disconnect = () => {
    dispatch({
      type: 'update_status',
      data: 0,
    });
    dispatch({
      type: 'user_address',
      data: '',
    });
    localStorage.removeItem('userAddress');
    localStorage.removeItem('token');
  };

  const registerUser = async () => {
    await Fetch.REGISTER(''); // update user status in database

    dispatch({
      type: 'update_status',
      data: 4,
    });
  };

  const loginUser = async (userAddress: string) => {
    try {
      const jsonStatus = await Fetch.USER_STATUS();

      if (!jsonStatus || !jsonStatus.status) return false;

      dispatch({
        type: 'update_status',
        data: jsonStatus.status,
      });

      dispatch({
        type: 'user_address',
        data: userAddress,
      });

      return jsonStatus.status;
    } catch (error) {
      console.log('Unregistered wallet: ' + props.page);
      console.log(error);

      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const token = await Fetch.REFRESH_TOKEN();

      if (!token) {
        console.log('Error refreshing token');
      } else {
        console.log('Retrieved refreshed token: ' + token);
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      // check if user is already logged in on app launch
      const userAddress = localStorage.getItem('userAddress');

      if (userAddress) {
        const userStatus = await loginUser(userAddress);
        if (userStatus !== false) {
          // get new access token to extend expiration time by 12 hours
          refreshToken();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignToken = async (web3: any, userAddress: string) => {
    const timestamp = Date.now();

    const msg = web3.utils.utf8ToHex(
      `Decentral Games Login\nTimestamp: ${timestamp}`
    );
    const signature = await web3.eth.personal.sign(msg, userAddress, '');

    // get JWT token
    const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

    console.log('Assigned token:', token);

    localStorage.setItem('userAddress', userAddress);
    localStorage.setItem('token', token);

    const userStatus = await loginUser(userAddress);
    if (userStatus === false) {
      await registerUser();
    }
  };

  const getProvider = () => {
    const provider = new WalletConnectProvider({
      rpc: {
        137: 'https://polygon-rpc.com',
      },
      chainId: 137,
      qrcode: false,
    });
    return provider;
  };

  const initiateWalletConnect = async () => {
    const provider: WalletConnectProvider = getProvider();
    const web3 = new Web3(provider as any);

    provider.connector.on('display_uri', (err, payload) => {
      const uri = payload.params[0];
      console.log(uri);
      const formattedURI = `https://metamask.app.link/wc?uri=${encodeURIComponent(
        uri
      )}`;
      window.location.replace(formattedURI);
    });

    provider.connector.on('connect', async (err, payload) => {
      console.log('Wallet connected:', payload);

      const { accounts } = payload.params[0];
      const address = accounts[0];

      // Segment: track wallet connect event
      window.analytics.track('Connected Wallet: ' + props.page, {
        userAddress: address,
      });

      console.log('Connected wallet with address:', address);
      console.log('Waiting for signature...');

      await assignToken(web3, address);

      provider.close();
    });

    provider.connector.on('transport_error', () => {
      console.log('transport_error');
      provider.close();
    });

    await provider.enable();
    provider.updateRpcUrl(137);
  };

  // write the user's wallet address with ellipsis added
  const ellipsis = state.userAddress
    ? state.userAddress.substring(0, 5) +
      '...' +
      state.userAddress.substring(state.userAddress.length - 4)
    : '';

  return (
    <Box
      className={styles.connectWallet}
      onClick={
        () => (state.userAddress ? disconnect() : initiateWalletConnect())
        // eslint-disable-next-line react/jsx-curly-newline
      }
    >
      <Image
        src="/images/home/metamask.svg"
        alt="metamask"
        width={35}
        height={35}
      />
      <Box>{state.userAddress ? ellipsis : 'Connect Your Wallet'}</Box>
    </Box>
  );
};

export default ButtonLogin;
