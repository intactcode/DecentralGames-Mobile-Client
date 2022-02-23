import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './PWAPrompt.module.scss';

let deferredPrompt: any;  

const PWAPrompt = () => {

  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });
  }, [])

  const handleInstallClick = () => {
    setInstallable(false);
    deferredPrompt.prompt();
  };

  const handleCancelClick = () => {
    setInstallable(false);
  }

  return (
    <div className={`${styles.main} ${installable ? 'show' : ''}`}>
      <div className={styles.top}>
        <div className={styles.title}>
          <Image
            src="/icons/icon-mobile.png"
            width={30}
            height={30}
            alt="Mobile ICE"
          />
          <h4>Mobile ICE | Decentral Games</h4>
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={styles.cancel} onClick={handleCancelClick}>Not Now</button>
        <button className={styles.add} onClick={handleInstallClick}>Add to Home Screen</button>
      </div>
    </div>
  );
};

export default PWAPrompt;
