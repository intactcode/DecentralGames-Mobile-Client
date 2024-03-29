import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useWindowSize } from '@/hooks/Hooks';
import styles from './LeaderBoard.module.scss';

interface LeaderBoardProps {
  open: boolean;
  setOpen: any;
}

const LeaderBoard: React.FC<LeaderBoardProps> = (props) => {
  const { open, setOpen } = props;
  const [scoredata, setScoreData] = useState<any[]>([]);
  const size = useWindowSize();

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 20; i++) {
      let data: any = { percentile: '', ice: '', chips: '' };
      data.percentile = `${i * 5 + 1} - ${i * 5 + 5}%`;
      data.ice = `${(1.5 - 0.05 * i).toFixed(2)}x`;
      data.chips = '+4000';
      temp.push(data);
    }
    setScoreData(temp);
  }, []);

  return (
    <section
      className={styles.leaderBoardBody}
      style={{
        maxHeight: open ? (size.width > 412 ? '500px' : '570px') : '0px',
      }}
    >
      <div
        className={styles.leaderBoardField}
        style={{ paddingBottom: open ? '30px' : '0px' }}
      >
        <div
          className={styles.closeIcon}
          style={{ display: open ? 'flex' : 'none' }}
          onClick={() => setOpen(false)}
        >
          <FaChevronDown fontSize="20px" />
        </div>
        <div className={styles.title}>
          Daily Leaderboard & Winnings Percentile
        </div>
        <div className={styles.scoreTab}>
          <span>Percentile</span>
          <span>ICE Multiplier</span>
          <span>Net Chips</span>
        </div>
        <section className={styles.leaderBoardContentContainer}>
          {scoredata.map((data: any, i: any) => {
            let radius: any, color: any;
            if (i < 10) {
              radius = 0.05 * i;
              color = '#91FF95';
            } else {
              radius = 1 - 0.1 * (i - 10);
              color = '#FF9191';
            }
            return (
              <div className={styles.leaderBoardContent} key={400 + i}>
                <div className={styles.starImgContainer}>
                  {i === 5 && (
                    <Image
                      src="/images/star.svg"
                      width="12px"
                      height="13px"
                      alt="star"
                    />
                  )}
                </div>
                <div className={styles.scoreField}>
                  <div className={styles.percentile}>{data.percentile}</div>
                  <div
                    className={styles.ice}
                    style={{
                      backgroundImage: `linear-gradient(
                      0deg,
                      rgba(255, 255, 255, ${radius}),
                      rgba(255, 255, 255, ${radius})),
                      linear-gradient(0deg, ${color}, ${color})`,
                    }}
                  >
                    {data.ice}
                  </div>
                  <div className={styles.chipField}>
                    <div className={styles.chipAmount}>{data.chips}</div>
                    <Image
                      src="/images/freecoin.svg"
                      width="12px"
                      height="12px"
                      alt="freecoin"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default LeaderBoard;
