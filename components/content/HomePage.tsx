import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <a
        href="https://decentral.games"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo}>
          <Image
            src="/icons/icon-256x256.png"
            alt="DG Logo"
            width={256}
            height={256}
          />
        </span>
      </a>

      <h1 className={styles.title}>Mobile ICE</h1>

      <p className={styles.description}>Play-to-Earn Games</p>
    </main>
  );
};

export default HomePage;
