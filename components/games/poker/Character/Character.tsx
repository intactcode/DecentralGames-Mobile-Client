import { useState } from 'react';
import { isEmpty, get } from 'lodash';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Image from 'next/image';
import CardBack from '../CardBack/CardBack';
import Card from '../Card/Card';
import InfoDialog from '../InfoDialog';
import UserInfoDialog from '../UserInfoDialog';
import { useStoreState } from '../../../../store/Hooks';
import styles from './Character.module.scss';

const Gradient = styled(Box)`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  box-shadow: 0px 0px 36px #ffe976;
`;

interface Props {
  image: string;
  left: string;
  top: string;
  active: boolean;
  user?: any;
  raise?: any;
  turn: boolean;
  index: number;
  onFold: any;
  items: any;
  ice?: number;
  xp?: number;
  dg?: number;
  data?: any;
}

const Character: React.FC<Props> = ({
  image,
  left,
  top,
  active,
  user,
  raise,
  index,
  items,
  ice,
  xp,
  dg,
  data,
}) => {
  const state = useStoreState();
  const currentSeat = state.currentSeat?.currentSeat;
  const activePlayer = state.tableData?.active;
  const isInHand = state.tableData?.isInHand ?? [];
  const winners = state.winners;
  const winnerIndex = get(winners, '0.0.0', isInHand.indexOf(true));
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);

  const isWon = !isEmpty(winners);

  const rpositionx = ['10px', '-40px', '-40px', '10px', '58px', '58px'];
  const rpositiony = ['-80px', '20px', '20px', '120px', '20px', '20px'];

  const dealerx = ['-23px', '-20px', '-20px', '75px', '70px', '70px'];
  const dealery = ['-5px', '60px', '-20px', '60px', '-20px', '60px'];

  const [infomodalopen, setInfoModalOpen] = useState(false);

  return (
    <Box
      left={left}
      top={top}
      position="absolute"
      style={{
        opacity: !isEmpty(winners) ? (winnerIndex === index ? 1 : 0.7) : 1,
      }}
    >
      {index === activePlayer && (
        <>
          <Gradient />
          <div className={styles.spinCircle}>
            <CountdownCircleTimer
              duration={30}
              strokeWidth={10}
              colors={[['#FFFFFF', 1]]}
              size={90}
              trailColor="transparent"
            />
          </div>
        </>
      )}
      {!user && (
        <InfoDialog
          open={infomodalopen}
          setOpen={setInfoModalOpen}
          items={items}
          index={index}
        />
      )}
      {user && (
        <UserInfoDialog
          open={infomodalopen}
          setOpen={setInfoModalOpen}
          items={items}
          ice={ice}
          xp={xp}
          dg={dg}
        />
      )}
      <div className={styles.playerCircle} onClick={() => setInfoModalOpen(!infomodalopen)}>
        <img
          style={{opacity: active ? 1 : 0.2}}
          src={data?.image ?? `/${image}`}
          width="60px"
          height="60px"
          alt="player-circle"
        />
      </div>
      {raise && (
        <>
        <div className={styles.raiseMoney} style={{left: rpositionx[index], top: rpositiony[index]}}>
          <div className={styles.raiseAmount}>
            {raise}
          </div>
          <img
            src="/images/freecoin.svg"
            width="18px"
            height="18px"
            alt="freecoin"
          />
        </div>
        </>
      )}
      <Box position="relative" left={dealerx[index]} top={dealery[index]}>
        <Image src="/images/DealerChip.svg" layout="fill" alt="dealer-chip" />
      </Box>
      <div className={styles.playerInfo} style={{opacity: active ? '1' : '0.6'}}>
        <div>{data?.name ?? 'Waiting...'}</div>
        {data && (
          <div className={styles.chipForBet}>
            <div className={styles.betAmount}>
              {data?.betSize}
            </div>
            <img className={styles.chipImage}
              src="/images/freecoin.svg"
              width="15px"
              height="15px"
            />
          </div>
        )}
      </div>
      {!isWon &&
        active &&
        index !== currentSeat &&
        isInHand[index] &&
        !!state.cards.length && (
          <Box display="flex" mt="-108px" ml="5px">
            <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
            <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
          </Box>
        )}
      {!isWon &&
        active &&
        index === currentSeat &&
        isInHand[index] &&
        !!state.cards.length && (
          <Box display="flex" mt="-125px" ml="-10px">
            <Card
              type={state.cards[0].suit}
              number={state.cards[0].rank}
              transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)"
            />
            <Card
              type={state.cards[1].suit}
              number={state.cards[1].rank}
              transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)"
            />
          </Box>
        )}
      {isWon && winners.cards[index] && (
        <Box key={`winner_card_${index}`} display="flex" mt="-125px" ml="-10px">
          <Box
            style={{
              borderColor: winnerPair.find(
                (winner: any) =>
                  winner.suit === winners.cards[index][0].suit &&
                  winner.rank === winners.cards[index][0].rank
              )
                ? 'red'
                : 'transparent',
              borderStyle: 'solid',
              borderWidth: '2px',
              borderRadius: '7px',
            }}
          >
            <Card
              type={winners.cards[index][0].suit}
              number={winners.cards[index][0].rank}
            />
          </Box>
          <Box
            style={{
              borderColor: winnerPair.find(
                (winner: any) =>
                  winner.suit === winners.cards[index][1].suit &&
                  winner.rank === winners.cards[index][1].rank
              )
                ? 'red'
                : 'transparent',
              borderStyle: 'solid',
              borderWidth: '2px',
              borderRadius: '7px',
            }}
          >
            <Card
              type={winners.cards[index][1].suit}
              number={winners.cards[index][1].rank}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Character;
