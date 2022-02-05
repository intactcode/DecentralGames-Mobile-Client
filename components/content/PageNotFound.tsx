// import Image from 'next/image';
import ButtonHome from '../buttons/ButtonHome';
import styles from '../../styles/Home.module.css';

const PageNotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <div style={{position:'relative', zIndex:30}} >
        <div className={styles.playtitle}>
          The requested page could not be found.
        </div>

        <ButtonHome page={'404'} />
      </div>
    </main>
  );
};

export default PageNotFound;
