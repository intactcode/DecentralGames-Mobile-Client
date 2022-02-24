// import Image from 'next/image';
import ButtonHome from '../../buttons/ButtonHome';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
  return (
    <div className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <div className={styles.text_container}>
        <h1 className={styles.play_title}>Page not found</h1>
      </div>

      <ButtonHome page={'404'} />
    </div>
  );
};

export default PageNotFound;
