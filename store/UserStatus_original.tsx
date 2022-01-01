import { useEffect, useContext } from 'react';
import { GlobalContext } from './index';
import Fetch from '../api/Fetch';

function UserStatus() {
  // returns current state paired with dispatch method from Context API
  const [state, dispatch]: any = useContext(GlobalContext);

  useEffect(() => {
    // fetch user status
    const response = getUserStatus();

    dispatch({
      type: 'update_status',
      data: response,
    });
  }, [dispatch]);

  async function getUserStatus() {
    console.log('Get user status: UserStatus');

    const jsonStatus = await Fetch.USER_STATUS();

    return jsonStatus;
  }

  return null;
}

export default UserStatus;
