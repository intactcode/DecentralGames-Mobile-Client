
import { get } from 'lodash';
import { useStoreState } from '@/hooks/Hooks';
import cn from 'classnames';
import {
    Card,
    CardSpot,
} from '@/components/games/poker';
import styles from './PokerGame.module.scss';
// import { EOL } from 'os';

const CommunityCards = () => {
    const state = useStoreState();

    const isWon = state.isWon;
    const winners = state.winners;
    const winnerPair = get(winners, 'winners.0.0.1.cards', []);
    const cards = get(state, 'tableData.community', []);

    let spots: number[] = [];
    for (let i = 0; i < 5 - cards.length; i++) {
        spots.push(i);
    }

    return (
        <div className={styles.styledCommunityCard}>
            {cards.map((card: any, index: number) => {
                return (
                    <div
                        className={cn(
                            styles.cardContainer,
                            !isWon ||
                                winnerPair.find(
                                    (winner: any) =>
                                        winner.suit === card.suit && winner.rank === card.rank
                                )
                                ? styles.opacity100
                                : styles.opacity20
                        )}
                        key={`card_${index}`}
                    >
                        <Card type={card.suit} number={card.rank} />
                    </div>
                );
            })}

            {spots.length > 0 &&
                spots.map((n: number, index: number) => {
                    return (
                        <div
                            className={cn(styles.cardContainer, styles.borderTransparent)}
                            key={`cardspot_${index}`}
                        >
                            <CardSpot />
                        </div>
                    );
                })}
        </div>
    );
};

export default CommunityCards;