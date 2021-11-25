import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mobile ICE | Decentral Games</title>
        <meta name="description" content="Mobile ICE | Decentral Games" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>You are offline. Please connect to the Internet</h1>

        <a
          href="https://decentral.games"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/icons/icon-255x256.png"
              alt="DG Logo"
              width={256}
              height={256}
            />
          </span>
        </a>

        <p className={styles.description}>Play-to-Earn Games</p>
      </main>

      <footer className={styles.footer}>&copy;2021 Decentral Games</footer>
    </div>
  );
};

export default Home;
