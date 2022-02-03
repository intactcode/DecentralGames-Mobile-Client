import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './InfoDialog.module.scss';

interface Props {
  index?: number;
  open: boolean;
  setOpen?: any;
  items?: any;
}

const InfoDialog: React.FC<Props> = ({ index, open, setOpen, items }) => {
  const dialog = useRef<any>();

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (dialog.current && !dialog.current.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [setOpen]);

  return (
    <section>
      <div
        className={styles.close}
        style={{
          display: open ? 'flex' : 'none',
          right:
            index === 1 || index === 2
              ? '-15px'
              : index === 3
              ? `-${(items.length * 32 + 8 * items.length - 8) / 2}px`
              : '50px',
        }}
      >
        <AiOutlineClose color="white" />
      </div>
      <div
        className={styles.dialog}
        style={{
          right:
            index === 1 || index === 2
              ? '0px'
              : index === 3
              ? `-${(items.length * 32 + 8 * items.length - 32) / 2}px`
              : 'unset',
          maxWidth: open ? '300px' : '0px',
        }}
        ref={dialog}
      >
        {items.map((data: string, i: number) => {
          return (
            <div
              className={styles.item}
              style={{
                marginLeft: i === 0 ? '16px' : '',
                marginRight: i === items.length - 1 ? '16px' : '',
              }}
              key={200 + i}
            >
              <Image src={data} key={data} layout="fill" alt="line" />
              <span>+31%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default InfoDialog;