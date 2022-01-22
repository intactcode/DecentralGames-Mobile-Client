import io from 'socket.io-client'; // using version 4.0.1 as latest version has issues with Next.js
import mobileServerURL from './MobileServerURL';
import { useEffect } from 'react';
import { useStoreState } from '../store/Hooks';

const Socket = () => {
  const state = useStoreState(); // returns current state from Context API store

  useEffect(() => {
    if (state.userStatus >= 4) {
      const socket = io(mobileServerURL, { transports: ['websocket'] });

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
