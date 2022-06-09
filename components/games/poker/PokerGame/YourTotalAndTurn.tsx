import { useState, useEffect } from 'react';
import { useStoreState } from '@/hooks/Hooks';
import { get } from 'lodash';
import cn from 'classnames';
import Image from 'next/image';
import styles from './PokerGame.module.scss';

const YourTotalAndTurn = () => {
    const state = useStoreState();

    const winners = state.winners;
    const isWon = state.isWon;
    const chipsAmount = state.chipUpdate.accountBalance;

    const currentSeat = get(state, 'currentSeat.currentSeat', 0);
    const activePlayer = get(state, 'tableData.activePlayer', 0);
    const isInHand =
        state.tableData?.seats?.map((el: any) => el && el.isInHand) ?? [];
    const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));

    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        setPlayers(Object.values(state.tableData.seats || {}));
    }, [state.tableData, state.socket.id]);

    return (
        <div className={styles.buttonContainerParentBottom}>
            <div className={styles.turnButtonContainer}>
                <div className={styles.yourTotal}>
                    <div className={styles.total}>Your Total</div>
                    <div className={styles.chipForBet}>
                        {chipsAmount && (
                            <div className={styles.betAmount}>{chipsAmount}</div>
                        )}
                        {chipsAmount && (
                            <Image
                                src="/images/freecoin.svg"
                                width="12px"
                                height="12px"
                                alt="chipImage"
                            />
                        )}
                    </div>
                </div>

                {!isWon &&
                    players[activePlayer] &&
                    (activePlayer === currentSeat ? (
                        <div className={styles.turnButton}>
                            <div className={styles.title}>Your Turn</div>
                            <div className={styles.dot} />
                        </div>
                    ) : (
                        <div className={cn(styles.turnButton, styles.greyBorder)}>
                            <div className={styles.title}>
                                {`${players[activePlayer]?.name}'s Turn`}
                            </div>
                        </div>
                    ))}

                {isWon && (
                    <div className={cn(styles.turnButton, styles.greyBorder)}>
                        <div className={styles.title} style={{ marginRight: '5px' }}>
                            {`${players[winnerIndex]?.name} wins`}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourTotalAndTurn;