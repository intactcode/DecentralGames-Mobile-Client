import { useStoreState } from '@/hooks/Hooks';
import styles from './PokerGame.module.scss';

const WaitIndicator = () => {
    const state = useStoreState();
    return (
        <>
            {!!state.waitTime && (
                <div className={styles.waitTime}>{state.waitTime}</div>
            )}
        </>
    );
};

export default WaitIndicator;