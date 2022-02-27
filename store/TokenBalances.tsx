import { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '@/hooks/Hooks';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BigNumber from 'bignumber.js';
import { Constants } from '@/components/common';
import { ABI_CHILD_TOKEN_DG, ABI_CHILD_TOKEN_ICE } from '@/components/abi';

function TokenBalances() {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const [dgContract, setDgContract] = useState({} as any);
  const [iceContract, setIceContract] = useState({} as any);
  const [instances, setInstances] = useState(false);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.userStatus >= 4) {
      const maticWeb3 = new Web3(Constants.MATIC_RPC[137]); // pass Matic provider URL to Web3 constructor

      const dgContract = new maticWeb3.eth.Contract(
        ABI_CHILD_TOKEN_DG as AbiItem[],
        Constants.CHILD_TOKEN_ADDRESS_DG
      );
      setDgContract(dgContract);

      const iceContract = new maticWeb3.eth.Contract(
        ABI_CHILD_TOKEN_ICE as AbiItem[],
        Constants.CHILD_TOKEN_ADDRESS_ICE
      );
      setIceContract(iceContract);

      setInstances(true); // contract instantiation complete
    }
  }, [state.userStatus]);

  function formatNumber(amount: number, decimals: number) {
    const redenominated = new BigNumber(amount)
      .div(Constants.FACTOR)
      .toFixed(decimals);

    const decimalPoint = redenominated.indexOf('.');
    const decimalLength =
      decimalPoint < 0 ? 1 : redenominated.length - decimalPoint;

    const amountAdjusted = new BigNumber(redenominated).toFormat(
      Math.min(decimals, decimalLength - 1)
    );

    return amountAdjusted;
  }

  // anytime user clicks token refresh button this code will execute
  useEffect(() => {
    if (instances) {
      (async function () {
        async function getTokenBalances() {
          try {
            const ICE_AMOUNT = await iceContract.methods
              .balanceOf(state.userAddress)
              .call();

            const ICE_AMOUNT_ADJUSTED = formatNumber(ICE_AMOUNT, 0);

            const DG_AMOUNT = await dgContract.methods
              .balanceOf(state.userAddress)
              .call();

            const DG_AMOUNT_ADJUSTED = formatNumber(DG_AMOUNT, 0);

            console.log('ICE amount: ' + ICE_AMOUNT_ADJUSTED);
            console.log('XP amount: ' + 0);
            console.log('DG amount (Polygon): ' + DG_AMOUNT_ADJUSTED);

            return {
              ICE_AMOUNT: ICE_AMOUNT_ADJUSTED,
              XP_AMOUNT: 0,
              DG_AMOUNT: DG_AMOUNT_ADJUSTED,
            };
          } catch (error) {
            console.log('Token balances error: ' + error);
          }
        }

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
