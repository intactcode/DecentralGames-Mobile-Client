import styles from './PokerGame.module.scss';

const InactiveButtons = () => {
    return (
        <div className={styles.buttonContainerParentBottom}>
            <div className={styles.actionButtonGroup}>
                <button disabled>Fold</button>
                <button disabled>Check</button>
                <button disabled>Bet</button>
            </div>
        </div>
    );
};

export default InactiveButtons;