/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { ButtonConnect, ButtonJoin, ButtonActivateICEWearable } from '@/components/buttons';
import { useStoreState } from '@/hooks/Hooks';
import { Images } from '@/components/common';
import styles from './JoinGameFlow.module.scss';

const NotLoggedIn: React.FC = () => {
  return (
    <>
      <div className={styles.button_container}>
        <Link href="/" passHref={true}>
          <div className={styles.close}>
            <FaChevronLeft fontSize="20px" />
          </div>
        </Link>

        <h2 className={styles.welcome}>
          Welcome to Free to Play <br /> Play-to-Earn ICE Poker!
        </h2>

        <p className={styles.play_text}>
          Play poker for free. Earn real cash value.
        </p>

        <span className={styles.image_span}>
          <span className={styles.image_grouping}>
            <img
              className={styles.wearable_image}
              src={'/images/img_wearables.svg'}
              alt="wearables"
            />

            <p className={styles.lower_text}>
              Get a <br /> Wearable
            </p>
          </span>
          <span className={styles.image_grouping}>
            <img
              className={styles.card_image}
              src={'/images/img_cards.svg'}
              alt="cards"
            />

            <p className={styles.lower_text}>
              Play Free <br /> Poker
            </p>
          </span>
          <span className={styles.image_grouping}>
            <img
              className={styles.diamond_image}
              src={'/images/img_diamond.svg'}
              alt="ice logo"
            />

            <p className={styles.lower_text}>
              Earn <br /> ICE
            </p>
          </span>
        </span>
      </div>
      <ButtonConnect />
    </>
  );
};

const ActivateWearable: React.FC = () => {
  return (
    <div className={styles.activate_wearable}>
      <Link href="/" passHref={true}>
        <div className={styles.close}>
          <FaChevronLeft fontSize="20px" />
        </div>
      </Link>

      <h2 className={styles.welcome}>You Must Activate Your Wearable</h2>

      <div className={styles.locked_wearable}>
        <img
          className={styles.locked_wearable_image}
          src={'/images/img_locked_wearable.png'}
          alt="wearable"
        />

        <div className={styles.locked_wearable_amount_container}>
          <p className={styles.locked_wearable_amount}>
            1
          </p>
        </div>
      </div>

      <p className={styles.play_text}>
        You’re holding an ICE Wearable that has not been activated yet.
        Activations prevent gameplay abuse.
        Please activate your wearable to begin playing ICE poker.
      </p>

      <ButtonActivateICEWearable />
    </div>
  );
};

const LoggedIn: React.FC = () => {
  return (
    <div className={styles.button_container_two}>
      <Link href="/" passHref={true}>
        <div className={styles.close}>
          <FaChevronLeft fontSize="20px" />
        </div>
      </Link>

      <h2 className={styles.welcome}>Ice Wearable Required!</h2>

      <img
        className={styles.wearable_image_two}
        src={Images.WEARABLES_2}
        alt="wearables"
      />

      <p className={styles.play_text}>
        In order to sit and play at free-to-play, play-to-earn ICE poker tables,
        you must be wearing (or delegated) an ICE Enabled Wearable. You can
        acquire one below.
      </p>

      <ButtonJoin />
    </div>
  );
};

const JoinGameFlow: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store

  return (
    <div className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />
      <div className={styles.text_container}></div>

      {state.userStatus < 4 ? <NotLoggedIn /> : state.userStatus > 100 ? <ActivateWearable /> : <LoggedIn />}
    </div>
  );
};

export default JoinGameFlow;
