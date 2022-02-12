import { useEffect } from 'react';
import Fetch from '../api/Fetch';
import { useStoreDispatch } from '../hooks/Hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { convertUtf8ToHex } from '@walletconnect/utils';
import Web3 from 'web3';
import constants from '../components/common/Constants';
import getCachedSession from '../api/GetCachedSession';

declare const window: any;

/* userStatus Reference:
 * 0: Wallet is neither connected nor authenticated
 * 2: Wallet is connected, but auth token is needed
 * 3: Wallet is in the process of verifying token; waiting on API response
 * 4+: Wallet is connected and authenticated
 */

const registerUser = async (dispatch: any) => {
  await Fetch.REGISTER('');

  dispatch({
    type: 'update_status',
    data: 4,
  });
};

const loginUser = async (dispatch: any, userAddress: string) => {
  try {
    const jsonStatus = await Fetch.USER_STATUS();

    if (!jsonStatus || !jsonStatus.status) {
      return false;
    } else {
      console.log('Dispatching user data');
    }

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
    console.log(error);

    return false;
  }
};

export const disconnectWallet = (dispatch: any) => {
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

export const assignToken = async (dispatch: any, web3: Web3) => {
  const userAddress =
    window.ethereum?.selectedAddress ||
    (await web3.eth.getAccounts())[0]?.toLowerCase();

  // Segment: track wallet connect event
  window.analytics.track('Connected Wallet', {
    userAddress: userAddress,
  });

  console.log('Connected wallet with address:', userAddress);
  console.log('Waiting for signature...');

  try {
    const timestamp = Date.now();
    const message = `Decentral Games Login\nTimestamp: ${timestamp}`;
    const hexMsg = convertUtf8ToHex(message);
    const signature = await web3.eth.personal.sign(hexMsg, userAddress, '');

    // get JWT token
    const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

    if (!token) {
      console.log('Error retrieving token');

      dispatch({
        type: 'update_status',
        data: 0,
      });
      return;
    }

    console.log('Assigned token:', token);

    localStorage.setItem(
      `session-${userAddress}`,
      JSON.stringify({
        userAddress: userAddress,
        token: token,
        expiration: new Date(new Date().getTime() + 60 * 60 * 12 * 1000),
      })
    );

    const userStatus = await loginUser(dispatch, userAddress);
    if (userStatus === false) {
      await registerUser(dispatch);
    }
  } catch (e) {
    // User cancelled signature
    dispatch({
      type: 'update_status',
      data: 0,
    });
  }
};

const getWalletConnectProvider = () => {
  return new WalletConnectProvider({
    rpc: constants.MATIC_RPC,
    chainId: constants.MATIC_CHAIN_ID,
    qrcodeModalOptions: {
      mobileLinks: ['rainbow', 'metamask', 'ledger', 'argent', 'trust'],
    },
  });
};

const connectMobileWallet = async (dispatch: any) => {
  window.localStorage.removeItem('walletconnect');
  const provider: WalletConnectProvider = getWalletConnectProvider();
  provider.updateRpcUrl(constants.MATIC_CHAIN_ID);
  const web3 = new Web3(provider as any);
  dispatch({
    type: 'web3_provider',
    data: web3,
  });

  provider.on('accountsChanged', async (accounts: string[]) => {
    const address = accounts[0];
    console.log('Wallet connected:', address);

    dispatch({
      type: 'update_status',
      data: 2,
    });
  });

  try {
    await provider.enable();
  } catch {
    console.log('Error connecting to wallet');
  }
};

const connectDesktopWallet = async (dispatch: any) => {
  await window.ethereum.request({ method: 'eth_requestAccounts' }); // open MetaMask for login
  await assignToken(dispatch, new Web3(window.ethereum));
};

export const connectWallet = async (dispatch: any) => {
  if (window.ethereum) {
    dispatch({
      type: 'update_status',
      data: 3,
    });

    connectDesktopWallet(dispatch);
  } else {
    connectMobileWallet(dispatch);
  }
};

const refreshToken = async (dispatch: any, userAddress: string) => {
  try {
    const token = await Fetch.REFRESH_TOKEN();

    if (!token) {
      console.log('Error refreshing token');

      dispatch({
        type: 'update_status',
        data: 0,
      });
    } else {
      console.log('Retrieved refreshed token: ' + token);

      localStorage.setItem(
        `session-${userAddress}`,
        JSON.stringify({
          userAddress: userAddress,
          token: token,
          expiration: new Date(new Date().getTime() + 60 * 60 * 12 * 1000),
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

function Wallet() {
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      // check if user is already logged in on app launch
      let userAddress = window.ethereum
        ? window.ethereum.selectedAddress
        : undefined;
      const cachedSession = getCachedSession(userAddress);

      if (cachedSession.userAddress) {
        dispatch({
          type: 'update_status',
          data: 3,
        });

        userAddress = cachedSession.userAddress;
        const userStatus = await loginUser(dispatch, userAddress);

        if (userStatus !== false) {
          // get new access token to extend expiration time by 12 hours
          console.log(`Refreshing token for ${userAddress}`);
          refreshToken(dispatch, userAddress);
        } else {
          // token expired; user needs to reauthenticate account
          console.log('Expired token');

          dispatch({
            type: 'update_status',
            data: 2,
          });
        }
      }

      // add event listeners for desktop wallet
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (account: string) => {
          console.log('Account changed to:', account);

          if (getCachedSession(window.ethereum.selectedAddress)) {
            disconnectWallet(dispatch);
            window.location.reload();
          }
        });

        window.ethereum.on('disconnect', () => {
          console.log('Wallet disconnected');

          if (getCachedSession(window.ethereum.selectedAddress)) {
            disconnectWallet(dispatch);
            window.location.reload();
          }
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default Wallet;
