import mobileServerURL from './MobileServerURL';
import { useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '../store/Hooks';
import * as Colyseus from 'colyseus.js';

const Socket = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.userStatus >= 4) {
      const authToken: string = localStorage.getItem('token') || '';
      const client = new Colyseus.Client(mobileServerURL);

      client
        .joinOrCreate('pokerTable', { authToken, chips: 1000 })
        .then((room) => {
          console.log(`Successfuly joined ${room.name} [${room.sessionId}]`);

          // dispatch socket instance to global state
          dispatch({
            type: 'socket_instance',
            data: room,
          });

          room.onMessage('tableData', (data: any) => {
            dispatch({
              type: 'table_data',
              data,
            });
          });

          room.onMessage('playerJoinTable', (data: any) => {
            console.log('New player joined:', data.name);
          });

          room.onMessage('status', (data: any) => {
            console.log('status: ', data);
          });

          room.onMessage('chipUpdate', (data: any) => {
            dispatch({
              type: 'chip_update',
              data,
            });
          });

          room.onMessage('currentSeat', (data: any) => {
            dispatch({
              type: 'current_seat',
              data,
            });
          });

          room.onMessage('playerSitDown', (data: any) => {
            dispatch({
              type: 'player_sit_down',
              data,
            });
          });

          room.onMessage('cards', (data: any) => {
            dispatch({
              type: 'cards',
              data,
            });
          });

          room.onMessage('waitTime', (data: any) => {
            dispatch({
              type: 'wait_time',
              data,
            });
          });

          room.onMessage('started', () => {
            dispatch({
              type: 'wait_time',
              data: 0,
            });
          });
        })
        .catch((e) => {
          console.log('JOIN ERROR', e);
        });
    }
  }, [dispatch, state.userStatus]);

  return null;
};

export default Socket;
