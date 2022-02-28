/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import { ButtonConnect, ButtonJoin, ButtonActivateICEWearable, ButtonJoinWithChips } from '@/components/buttons';
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

        <h2 className={styles.welcome_text}>
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

      <h2 className={styles.welcome_text}>You Must Activate Your Wearable</h2>

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

interface WearItemProps {
  chipAmount?: number;
  status?: string;
  quantity?: number;
  diamond?: number;
  image?: string;
  index?: number;
}

const WearItem: React.FC<WearItemProps> = (props) => {
  const { chipAmount, status, quantity, diamond, image, index } = props;

  return (
    <div
      className={styles.wear_item}
      style={{marginLeft: index === 0 ? '0px' : '10px', opacity: image ? '1' : '0.5'}}
    >
      <div className={styles.chip}>
        <p className={styles.chip_amount}>
          +{chipAmount}
        </p>
        <div className={styles.chip_image}>
          <Image
            src="/images/freecoin.svg"
            width="11px"
            height="11px"
            alt="chipImage"
          />
        </div>
      </div>

      <div className={styles.wear_item_image_container}>
        <img
          className={styles.wear_item_image}
          src={image ? `/images/${image}` : '/images/img_wear_empty.svg'}
          alt="wearItem"
        />

        {quantity && (
          <div className={styles.wear_item_quantity_container}>
            <p className={styles.wear_item_quantity}>
              {quantity}
            </p>
          </div>
        )}

        {status && (
          <div
            className={styles.wear_item_status_container}
            style={{backgroundColor: status === 'NOT ACTIVE' ? 'rgba(215, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.75)'}}
          >
            <p className={styles.wear_item_status}>
              {status}
            </p>
          </div>
        )}
      </div>

      <div className={styles.diamond}>
        <p className={styles.diamond_amount}>
          +{diamond}%
        </p>
        <div className={styles.diamond_image}>
          <Image
            src="/images/diamond.svg"
            width="12px"
            height="12px"
            alt="diamondImage"
          />
        </div>
      </div>
    </div>
  )
}

const NoWearablesCheckIn: React.FC = () => {
  return (
    <div className={styles.no_wearables_check_in}>
      <Link href="/" passHref={true}>
        <div className={styles.close}>
          <FaChevronLeft fontSize="20px" />
        </div>
      </Link>

      <h2 className={styles.welcome_text}>Check-In To Play ICE Poker</h2>

      <div className={styles.titles}>
        <p className={styles.title}>
          YOU&apos;RE WEARING:
        </p>
      </div>

      <div className={styles.wear_items}>
        <WearItem
          chipAmount={3000}
          status={'DELEGATED'}
          quantity={3}
          diamond={31}
          image={'img_wear_upper.svg'}
          index={0}
        />
        <WearItem
          chipAmount={500}
          status={''}
          quantity={3}
          diamond={21}
          image={'img_wear_lower.svg'}
          index={1}
        />
        <WearItem
          chipAmount={500}
          status={''}
          diamond={0}
          index={2}
        />
      </div>

      <div className={styles.titles}>
        <p className={styles.title}>
          YOU&apos;RE NOT WEARING:
        </p>

        <p className={styles.highlighted_title}>
          HOW DO I EQUIP?
        </p>
      </div>

      <div className={styles.wear_items}>
        <WearItem
          chipAmount={500}
          status={'NOT ACTIVE'}
          quantity={1}
          diamond={6}
          image={'img_wear_glasses.svg'}
          index={0}
        />
      </div>

      <p className={styles.play_text}>
        Your starting chip stack (and ICE bonus) is based on the total wearables you wear at check-in.
        You only get one check-in per day!
      </p>

      <ButtonJoinWithChips
        chipAmount={3000}
      />
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

      <h2 className={styles.welcome_text}>Ice Wearable Required!</h2>

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

      {state.userStatus < 4 ? <NotLoggedIn /> : <LoggedIn />}
      {false && (
        <>
          <ActivateWearable />
          <NoWearablesCheckIn />
        </>
      )}
    </div>
  );
};

export default JoinGameFlow;
