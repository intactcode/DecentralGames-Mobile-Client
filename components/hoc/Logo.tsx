import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const Logo = () => {
  return (
    <a href="https://decentral.games" rel="noreferrer" target="_blank">
      <div className={styles.logo}>
        <Image src="/images/dg-logo.png" alt="logo" width={40} height={40} />
      </div>
    </a>
  );
};

export default Logo;
