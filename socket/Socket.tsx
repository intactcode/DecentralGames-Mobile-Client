import io from 'socket.io-client'; // using version 4.0.1 as latest version has issues with Next.js
import mobileServerURL from './MobileServerURL';
import { useEffect } from 'react';
import { useStoreState } from '../store/Hooks';

const Socket = () => {
  const state = useStoreState(); // returns current state from Context API store

  // define local variables
  const socket = io(mobileServerURL, { transports: ['websocket'] });

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (state.socketConnect) {
      console.log('Connect to mobile socket server');

      socket.on('connection', (socket: typeof Socket) => {
        console.log('Socket response:', socket);
      });
    }
  }, [socket, state.socketConnect]);

  useEffect(() => {
    if (state.createTable) {
      console.log('Create new table');

      socket.on('createTable', (data: string) => {
        console.log('Incoming data: ' + data);
      });
    }
  }, [socket, state.createTable]);

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

  return null;
};

export default Socket;
