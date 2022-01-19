import io from 'socket.io-client'; // using version 4.0.1 as latest version has issues with Next.js
import mobileServerURL from './MobileServerURL';

const Socket = () => {
  // define local variables
  const socket = io(mobileServerURL);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  socket.on('connection', (socket: typeof Socket) => {
    console.log('socket connected:', socket);
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

  return null;
};

export default Socket;
