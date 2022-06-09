import { useEffect, useState } from 'react';
import { useStoreState } from '@/hooks/Hooks';
import styles from './PokerGame.module.scss';

const RoundIndicator = () => {
    const state = useStoreState();
    const [overlayTimeout, setOverlayTimeout] = useState(false);

    useEffect(() => {
        if (state.tableData.round) {
            setOverlayTimeout(true);
            setTimeout(() => {
                setOverlayTimeout(false);
            }, 5000);
        }
    }, [state.tableData.round]);

    return (
        <>
            {overlayTimeout && (
                <div className={styles.roundOverlay}>{state.tableData.round}</div>
            )}
        </>
    );
};

export default RoundIndicator;