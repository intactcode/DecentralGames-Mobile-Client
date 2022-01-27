import io from 'socket.io-client'; // using version 4.0.1 as latest version has issues with Next.js
import mobileServerURL from './MobileServerURL';
import { useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '../store/Hooks';

const Socket = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  useEffect(() => {
    if (state.userStatus >= 4) {
      const autoToken: string = localStorage.getItem('token') || '';
      const socket = io(mobileServerURL, {
        transports: ['websocket'],
        query: {
          autoToken,
        },
      });

      // dispatch socket instance to global state
      dispatch({
        type: 'socket_instance',
        data: socket,
      });

      socket.on('connection', (socket: typeof Socket) => {
        console.log('Socket server response:', socket);
      });

      socket.on('createdTable', (data: any) => {
        // dispatch active table ID to global state
        dispatch({
          type: 'active_table',
          data: data.tableId,
        });
      });

      socket.on('joinedTable', (data: any) => {
        if (data.tableId) {
          // dispatch active table ID to global state
          dispatch({
            type: 'active_table',
            data: data.tableId,
          });
        }
      });

      socket.on('tableData', (data: any) => {
        dispatch({
          type: 'table_data',
          data,
        });
      });

      socket.on('playerJoinTable', (data: any) => {
        console.log('new player joined: ', data.playerId);
      });

      socket.on('status', (data: any) => {
        console.log('status: ', data);
      });

      socket.on('chipUpdate', (data: any) => {
        dispatch({
          type: 'chip_update',
          data,
        });
      });

      socket.on('currentSeat', (data: any) => {
        dispatch({
          type: 'current_seat',
          data,
        });
      });

      socket.on('playerSitDown', (data: any) => {
        dispatch({
          type: 'player_sit_down',
          data,
        });
      });

      socket.on('cards', (data: any) => {
        dispatch({
          type: 'cards',
          data,
        });
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
  }, [dispatch, state.userStatus]);

  return null;
};

export default Socket;
