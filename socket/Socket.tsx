import { useEffect } from 'react';
import socketServerURL from './SocketServerURL';
import { useStoreState, useStoreDispatch } from '../hooks/Hooks';
import getCachedSession from '../api/GetCachedSession';
import * as Colyseus from 'colyseus.js';

const Socket = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.userStatus >= 4) {
      if (state.game === 'poker') {
        const authToken: string =
          getCachedSession(state.userAddress).token || '';
        const client = new Colyseus.Client(socketServerURL);

        client
          .joinOrCreate('pokerTable', { authToken, chips: 1000 })
          .then((room) => {
            console.log(`Successfully joined ${room.name} [${room.sessionId}]`);

            // dispatch socket instance to global state
            dispatch({
              type: 'socket_instance',
              data: room,
            });

            room.onLeave((code) => {
              console.log('client left the room', code);
            });

            room.onMessage('tableData', (data: any) => {
              console.log('Incoming tableData: ', data);
              dispatch({
                type: 'table_data',
                data,
              });
            });

            room.onMessage('playerLeaveTable', (data: any) => {
              console.log('A player left table slot: ', data);
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
              if (data === 0) {
                dispatch({
                  type: 'set_winner',
                  data: {
                    cards: [],
                    winners: [],
                  },
                });
              }

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

            room.onMessage('winners', (winners: any) => {
              dispatch({
                type: 'set_winner',
                data: winners,
              });
            });
          })
          .catch((e) => {
            console.log('JOIN ERROR', e);
          });
      }
    }

    //eslint-disable-next-line
  }, [dispatch, state.userStatus, state.game]);

  return null;
};

export default Socket;
