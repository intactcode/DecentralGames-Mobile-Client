import { useStoreState } from '@/hooks/Hooks';
import styles from './PokerGame.module.scss';

const TableAndPot = () => {
  const state = useStoreState();

  return (
    <>
      <div className={styles.table} />

      <div className={styles.potContainer}>
        <div className={styles.pot}>
          <div>Pot:</div>
          <div className={styles.amount}>{state.tableData?.pot || 0}</div>
        </div>
      </div>
    </>
  );
};

export default TableAndPot;