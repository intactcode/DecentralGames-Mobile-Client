import { ProgressBar } from '@/components/games/poker';
import styles from './PokerGame.module.scss';

interface ChallengesProps {
    setIsSetting: any
    issetting: boolean
}

const Challenges = ({ setIsSetting, issetting }: ChallengesProps) => {
    return (
        <>
            <div
                className={styles.progressContainer}
                onClick={() => setIsSetting(!issetting)}
            >
                <div className={styles.progress}>
                    <span>See the river 15 times</span>

                    <ProgressBar type={0} percent={7 / 15} text="7/15" width="74px" />
                </div>
                <div className={styles.progress}>
                    <span>Win the hand X times</span>

                    <ProgressBar type={1} percent={1 / 8} text="1/8" width="74px" />
                </div>
                <div className={styles.progress}>
                    <span>Get a three of a kind X times</span>

                    <ProgressBar type={2} percent={3 / 4} text="3/4" width="74px" />
                </div>
            </div>
        </>
    );
};

export default Challenges;