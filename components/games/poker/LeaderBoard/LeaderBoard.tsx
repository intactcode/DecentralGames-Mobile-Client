import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import styles from './LeaderBoard.module.scss';

interface Props {
  open: boolean;
  setOpen: any;
}

const LeaderBoard: React.FC<Props> = ({ open, setOpen }) => {
  const [scoredata, setScoreData] = useState<any[]>([]);

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
    <>
      <div className={styles.leaderBoardBody} style={{maxHeight: open ? '800px' : '0px'}}>
        <div className={styles.leaderBoardField}>
          <div
            className={styles.closeIcon}
            style={{display: open ? 'flex' : 'none'}}
            onClick={() => setOpen(false)}
          >
            <FaChevronDown fontSize="20px"/>
          </div>
          <div className={styles.title}>
            Daily Leaderboard & Winnings Percentile
          </div>
          <div className={styles.scoreTab}>
            <span>Percentile</span>
            <span>ICE Multiplier</span>
            <span>Net Chips</span>
          </div>
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
                  <Image
                    src="/images/star.svg"
                    width={12}
                    height={13}
                    alt="star"
                  />
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
                      width={14}
                      height={14}
                      alt="freecoin"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
