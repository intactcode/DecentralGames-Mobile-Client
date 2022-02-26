import { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '@/hooks/Hooks';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BigNumber from 'bignumber.js';
import { Constants } from '@/components/common';
import { ABI_CHILD_TOKEN_DG, ABI_CHILD_TOKEN_ICE } from '@/components/abi';
// import ABI_CHILD_TOKEN_DG from '@/components/abi/ABI_CHILD_TOKEN_DG.json';
// import ABI_CHILD_TOKEN_ICE from '@/components/abi/ABI_CHILD_TOKEN_DG.json';

function TokenBalances() {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  const [dgContract, setDgContract] = useState({});
  const [iceContract, setIceContract] = useState({});

  const [instances, setInstances] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  // async function fetchData() {
  // const web3 = new Web3(window.ethereum); // pass MetaMask provider to Web3 constructor

  // }

  useEffect(() => {
    if (state.userStatus >= 4) {
      // console.log('matic rpc... ');
      // console.log(Constants.MATIC_RPC[137]);

      const maticWeb3 = new Web3(Constants.MATIC_RPC[137]); // pass Matic provider URL to Web3 constructor

      const dgContract = new maticWeb3.eth.Contract(
        ABI_CHILD_TOKEN_DG as AbiItem[],
        Constants.CHILD_TOKEN_ADDRESS_DG
      );
      setDgContract(dgContract);

      // console.log('dg contract instance...');
      // console.log(dgContract);

      const iceContract = new maticWeb3.eth.Contract(
        ABI_CHILD_TOKEN_ICE as AbiItem[],
        Constants.CHILD_TOKEN_ADDRESS_ICE
      );
      setIceContract(iceContract);

      // console.log('ice contract instance...');
      // console.log(iceContract);

      setInstances(true); // contract instantiation complete
    }
  }, [state.userStatus]);

  // useCallback(() => {

  // }, [dgContract.methods, iceContract.methods, state.userAddress]);

  // anytime user clicks token refresh button this code will execute
  useEffect(() => {
    if (instances) {
      (async function () {
        async function getTokenBalances() {
          try {
            const DG_AMOUNT = await dgContract.methods
              .balanceOf(state.userAddress)
              .call();

            const DG_AMOUNT_ADJUSTED = new BigNumber(DG_AMOUNT)
              .div(Constants.FACTOR)
              .toFixed(0);

            const ICE_AMOUNT = await iceContract.methods
              .balanceOf(state.userAddress)
              .call();

            const ICE_AMOUNT_ADJUSTED = new BigNumber(ICE_AMOUNT)
              .div(Constants.FACTOR)
              .toFixed(0);

            console.log('DG amount (Polygon): ' + DG_AMOUNT_ADJUSTED);
            console.log('ICE amount (Polygon): ' + ICE_AMOUNT_ADJUSTED);

            return {
              DG_AMOUNT: DG_AMOUNT_ADJUSTED,
              ICE_AMOUNT: ICE_AMOUNT_ADJUSTED,
            };
          } catch (error) {
            console.log('Token balances error: ' + error);
          }
        }

        // update global state unclaimed DG points balances
        const tokenBalances = await getTokenBalances();

        dispatch({
          type: 'token_amounts',
          data: tokenBalances,
        });
      })();
    }
  }, [
    instances,
    dispatch,
    dgContract.methods,
    iceContract.methods,
    state.userAddress,
    state.refreshBalances,
  ]);

  return null;
}

export default TokenBalances;
