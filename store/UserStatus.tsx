import { useEffect, useContext } from 'react';
import { GlobalContext } from './index';
import Fetch from '../api/Fetch';

declare const window: any;

function UserStatus() {
  // returns current state paired with dispatch method from Context API
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch]: any = useContext(GlobalContext);

  async function getUserStatus() {
    console.log('Get user status: UserStatus');

    try {
      const jsonStatus = await Fetch.USER_STATUS();

      if (!jsonStatus.status) return false;

      return jsonStatus.status;
    } catch (error) {
      console.log('Unregistered wallet: UserStatus');
      console.log(error);

      return false;
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum?.selectedAddress) {
        // set user status to 3 to denote fetching user status, and dispatch the user address
        dispatch({
          type: 'update_status',
          data: 3,
        });

        dispatch({
          type: 'user_address',
          data: window.ethereum?.selectedAddress,
        });

        // fetch user status
        (async () => {
          const response = await getUserStatus();

          console.log('User status: ' + response);

          // if the response is truthy set the user's respective status, else set status back to 0
          // (/websiteLogin API call will return error if this is an unregistered wallet address)
          if (response) {
            dispatch({
              type: 'update_status',
              data: response,
            });
          } else {
            dispatch({
              type: 'update_status',
              data: 0,
            });
          }
        })();
      }
    }
  }, [dispatch]);

  return null;
}

export default UserStatus;
