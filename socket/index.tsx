// import { useEffect } from 'react';
import io from 'socket.io-client'; // using sockent.io-client version 4.0.1 as latest version has issues with next.js
import mobileServerURL from './MobileServerURL';

const Socket = () => {
  // define local variables
  const socket = io(mobileServerURL);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  //   socket.on('connection', (socket: typeof Socket) => {
  //     socket.on('my other event', (data) => {
  //       console.log('I got data. will running another function', data.count);
  //     });
  //   });

  socket.on('createTable', (data: string) => {
    console.log('Incoming data: ' + data);
  });

  // useEffect(() => {
  //   fetch('/api/socketio').finally(() => {
  //     const socket = io(mobileServerURL);

  //     socket.on('connect', () => {
  //       console.log('connect');
  //       socket.emit('hello');
  //     });

  //     socket.on('hello', (data: any) => {
  //       console.log('hello', data);
  //     });

  //     socket.on('a user connected', () => {
  //       console.log('a user connected');
  //     });

  //     socket.on('disconnect', () => {
  //       console.log('disconnect');
  //     });
  //   });
  // }, []);

  return null;
};

export default Socket;
