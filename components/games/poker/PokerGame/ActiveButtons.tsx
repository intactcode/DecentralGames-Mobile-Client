import { useStoreState } from '@/hooks/Hooks';
import { get } from 'lodash';
import styles from './PokerGame.module.scss';

interface ActiveButtonsProps {
    setRaiseShow: any
}

const ActiveButtons = ({ setRaiseShow }: ActiveButtonsProps) => {
    const state = useStoreState();

    const isWon = state.isWon;
    const legalActions = get(state, 'tableData.legalActions.actions', []);
    const chipRange = get(state, 'tableData.legalActions.chipRange', {});
    const forcedBets = get(state, 'currentSeat.forced', {});

    const canCall = () => {
        return legalActions.includes('call');
    };

    const canCheck = () => {
        return legalActions.includes('check');
    };

    // const canRaise = (amount: number) => {
    //     return amount >= chipRange.min && amount <= chipRange.max;
    // };

    const canBet = (amount: number) => {
        return amount >= chipRange.min && amount <= chipRange.max;
    };

    const onFold = () => {
        console.log('Clicked Fold');

        state.socket.send('foldTable');
    };

    const onCheck = () => {
        console.log('Clicked Check');

        if (canCheck()) {
            state.socket.send('checkTable');
        }
    };

    const onCall = () => {
        console.log('Clicked Call');

        state.socket.send('callTable');
    };

    const onBet = () => {
        console.log('Clicked Bet');

        if (!canBet(forcedBets.bigBlind)) {
            alert('Input correct amount');
            return;
        }
        state.socket.send('betTable', { bet: forcedBets.bigBlind });
    };

    return (
        <div className={styles.buttonContainerParentBottom}>
            <div className={styles.actionButtonGroup}>
                <button disabled={isWon} onClick={() => onFold()}>
                    Fold
                </button>

                {canCall() && (
                    <button disabled={isWon} onClick={() => onCall()}>
                        Call
                    </button>
                )}

                {canCheck() && (
                    <button disabled={isWon} onClick={() => onCheck()}>
                        Check
                    </button>
                )}

                {legalActions.includes('raise') && (
                    <button disabled={isWon} onClick={() => setRaiseShow(true)}>
                        Raise
                    </button>
                )}

                {legalActions.includes('bet') && (
                    <button disabled={isWon} onClick={() => onBet()}>
                        Bet
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActiveButtons;