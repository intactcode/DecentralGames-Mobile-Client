import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import styles from './UserInfoDialog.module.scss';

interface Props {
  index?: number;
  open: boolean;
  setOpen?: any;
  items?: any;
  ice?: number;
  xp?: number;
  dg?: number;
}

const UserInfoDialog: React.FC<Props> = ({
  open,
  setOpen,
  items,
  ice,
  xp,
  dg,
}) => {
  const dialog = useRef<any>();
  const [useritems, setUserItems] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (dialog.current && !dialog.current.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [setOpen]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 5; i++) temp.push('');
    for (let i = 0; i < items.length; i++) {
      temp[i] = items[i];
    }
    setUserItems(temp);
  }, [items]);

  return (
    <section>
      <div className={styles.close} style={{display: open ? 'flex' : 'none'}}>
        <AiOutlineClose color="white" />
      </div>
      <div className={styles.dialog} style={{zIndex: open ? 10 : 0, opacity: open ? 1 : 0}} ref={dialog}>
        <div className={styles.title}>
          Your Player Stats
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.itemContainer}>
            <span>ICE BALANCE</span>
            <div className={styles.itemField}>
              <div className={styles.iceLabel}>{ice}</div>
              <Image
                src="/images/diamond.svg"
                width={26}
                height={23}
                alt="diamond"
              />
            </div>
          </div>
          <div className={styles.itemContainer}>
            <span>XP BALANCE</span>
            <div className={styles.itemField}>
              <div className={styles.xpLabel}>{xp}</div>
              <Image src="/images/xp.png" width={29} height={17} alt="xp" />
            </div>
          </div>
          <div className={styles.itemContainer}>
            <span>DG BALANCE</span>
            <div className={styles.itemField}>
              <div className={styles.dgLabel}>{dg}</div>
              <Image src="/images/dg-logo.png" width={25} height={25} alt="dg" />
            </div>
          </div>
        </div>
        <div>
          <span>EQUIPPED ICE WEARABLES (+100% BONUS)</span>
        </div>
        <div className={styles.userItemsContainer}>
          {useritems.map((data: string, i: number) => {
            return (
              <div className={styles.userItemContainer} key={100 + i}>
                {data !== '' ? (
                  <>
                    <div className={styles.userItemImgContainer}>
                      <Image
                        src={`${data}`}
                        key={i}
                        alt="line"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <span>+31%</span>
                  </>
                ) : (
                  <>
                    <div className={styles.noneItem}/>
                    <span style={{ opacity: 0.25 }}>+0%</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserInfoDialog;