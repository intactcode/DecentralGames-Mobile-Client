import io from 'socket.io-client'; // using version 4.0.1 as latest version has issues with Next.js
import mobileServerURL from './MobileServerURL';
import { useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '../store/Hooks';

const Socket = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  useEffect(() => {
    if (state.userStatus >= 4) {
      const socket = io(mobileServerURL, { transports: ['websocket'] });

      // dispatch socket instance to global state
      dispatch({
        type: 'socket_instance',
        data: socket,
      });

      socket.on('connection', (socket: typeof Socket) => {
        console.log('Socket server response:', socket);
      });

      socket.on('createTable', (data: string) => {
        console.log('Incoming data: ' + data);
      });

      const tryReconnect = () => {
        setTimeout(() => {
          socket.io.open((err) => {
            if (err) {
              tryReconnect();
            }
          });
        }, 2000);
      };

      socket.on('close', tryReconnect);
    }
  }, [state.userStatus]);

  return null;
};

export default Socket;
