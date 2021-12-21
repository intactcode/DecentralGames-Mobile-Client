import { useEffect, useContext, useState } from 'react';
import Web3 from 'web3';
import { Button } from '@mui/material';
import { useMediaQuery } from '../../hooks';
import { GlobalContext } from '../../store';
import { API_BASE_URL } from '../../common/Fetch';
import call from '../../common/API';
import Image from 'next/image';
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

    const token = await call(
      `${API_BASE_URL}/authentication/getWebAuthToken?address=${userAddress}&signature=${signature}&timestamp=${timestamp}`,
      'GET',
      false
    );

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

const HomePage = () => {
  // get user's status from the Context API store
  const [state, dispatch]: any = useContext(GlobalContext);

  // define local variables
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);
  const tablet = useMediaQuery('(max-width: 992px)');

  // get network ID
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

  useEffect(() => {
    console.log('User status: ' + state.userStatus);
  }, [state.userStatus]);

  let userAddress = '';

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  async function updateStatus(value: any, post: boolean) {
    if (post) {
      console.log('Posting user status to db: ' + value);

      // update user status in database
      // await Fetch.REGISTER(state.affiliateAddress);

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

  async function getUserStatus() {
    console.log('Get user status: ModalLogin');

    // try {
    //   const responseStatus = await Fetch.USER_STATUS(userAddress, '');
    //   const jsonStatus = await responseStatus.json();

    //   if (!jsonStatus.status) return false;

    //   return jsonStatus.status;
    // } catch {
    //   console.log('Unregistered wallet: ModalLogin');

    //   return false;
    // }
    return 4;
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

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <main className={styles.main}>
      <a
        href="https://decentral.games"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <Image
            src="/icons/icon-256x256.png"
            alt="DG Logo"
            width={256}
            height={256}
          />
        </span>
      </a>

      <h1 className={styles.title}>Mobile ICE</h1>

      <p className={styles.description}>Decentral Games</p>

      <Button
        style={{
          padding: '8px 12px',
          background: '#006eff',
          color: 'white',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
        onClick={() => openMetaMask()}
      >
        {state.userAddress
          ? 'Connected'
          : tablet
            ? 'Connect'
            : 'Connect MetaMask'}
      </Button>
    </main>
  );
};

export default HomePage;
