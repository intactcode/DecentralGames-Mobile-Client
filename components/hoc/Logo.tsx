import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Logo = () => {
  return (
    <Link href="https://decentral.games/" passHref>
      <div className={styles.logo}>
        <Image src="/images/dg-logo.png" alt="logo" width={40} height={40} />
      </div>
    </Link>
  );
};

export default Logo;
