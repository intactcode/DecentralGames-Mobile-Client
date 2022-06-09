import { useState } from 'react';
import Image from 'next/image';
import { ButtonRefresh } from '@/components/buttons';
import styles from './PokerGame.module.scss';

const TopButtons = () => {
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  return (
    <div className={styles.links}>
      <ButtonRefresh />
      <div
        className={styles.blackEllipse}
        onClick={() => setIsLeaderBoard(!isleaderboard)}
      >
        <Image
          src="/images/leaderboard.svg"
          width={20}
          height={20}
          alt={'leaderboard'}
        />
      </div>
    </div>
  );
};

export default TopButtons;
