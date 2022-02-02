import ButtonConnect from '../../buttons/ButtonConnect/ButtonConnect';
import styles from './ConnectWallet.module.scss';
import Image from 'next/image';


const ConnectWallet = () => {
  return (
    <div className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />
      <div className={styles.text_container}>
      </div>

      <div className={styles.button_container}>
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
    </div>
  );
};

export default ConnectWallet;