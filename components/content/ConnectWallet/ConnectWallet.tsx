import ButtonConnect from '../../buttons/ButtonConnect/ButtonConnect';
import ButtonJoin from '../../buttons/ButtonJoin/ButtonJoin';
import styles from './ConnectWallet.module.scss';
import { useStoreState } from '../../../store/Hooks';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link'


const ConnectWallet = () => {
  const state = useStoreState(); // returns global state from Context API store

  return (
    <div className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />
      <div className={styles.text_container}>
      </div>

      {state.userStatus < 4 ? (
        <div className={styles.button_container}>
          <Link href="/">
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
                src="https://res.cloudinary.com/dnzambf4m/image/upload/v1643834689/Group_190_p0wyd7.png"
                alt="wearables"
              />
              <p className={styles.lower_text}>
                Get a <br /> Wearable
              </p>
            </span>
            <span className={styles.image_grouping}>
              <img
                className={styles.card_image}
                src="https://res.cloudinary.com/dnzambf4m/image/upload/v1643834689/Group_227_l1z7cv.png"
                alt="cards"
              />
              <p className={styles.lower_text}>
                Play Free <br /> Poker
              </p>
            </span>
            <span className={styles.image_grouping}>
              <img
                className={styles.diamond_image}
                src="https://res.cloudinary.com/dnzambf4m/image/upload/v1643834689/Group_248_ztffw6.png"
                alt="ice logo"
              />
              <p className={styles.lower_text}>
                Earn <br /> Ice
              </p>
            </span>         
          </span>
          <ButtonConnect />
        </div>
      ) : (
        <div className={styles.button_container_two}>
          <Link href="/">
            <div className={styles.close}>
              <FaChevronLeft fontSize="20px" />
            </div>
          </Link>
          <h2 className={styles.welcome}> 
            Ice Wearable Required! 
          </h2>

          <img
            className={styles.wearable_image_two}
            src="https://res.cloudinary.com/dnzambf4m/image/upload/v1643841009/Group_805_fh2pph.png"
            alt="wearables"
          />
          
          <p className={styles.play_text}>
            In order to sit and play at free-to-play, play-to-earn ICE poker tables, you must be wearing (or delegated) an ICE Enabled Wearable. You can acquire one below.
          </p>

          <ButtonJoin />
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;