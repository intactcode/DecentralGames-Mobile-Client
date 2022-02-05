import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import styles from './RaiseSetting.module.scss';

interface Props {
  open: boolean;
  setOpen: any;
  setRaiseAmount: any;
  raiseamount: number;
  onRaise: any;
}

const RaiseSetting: React.FC<Props> = ({
  open,
  setOpen,
  raiseamount,
  setRaiseAmount,
  onRaise,
}) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <div>
      {!keyboardOpen ? (
        <div
          className={styles.raiseField}
          style={{ maxHeight: open ? '400px' : '0px' }}
        >
          <div className={styles.raisePanel}>
            <div
              className={styles.closeIcon}
              style={{ display: open ? 'flex' : 'none' }}
              onClick={() => {
                setOpen(false);
                setKeyboardOpen(false);
              }}
            >
              <FaChevronDown fontSize="20px" />
            </div>
            <div className={styles.raiseInput}>
              <div className={styles.title}>Your Bet:</div>
              <span className={styles.inputContainer}>
                <input
                  className="raise"
                  type="numeric"
                  value={raiseamount}
                  onChange={(event) => {
                    setRaiseAmount(Number(event.target.value));
                  }}
                  onClick={() => setKeyboardOpen(true)}
                />
                <Image
                  src="/images/freecoin.svg"
                  alt="freecoin"
                  width={44}
                  height={44}
                />
              </span>
              <span style={{ display: 'flex' }}>
                <div
                  className={styles.raiseButton}
                  onClick={() => {
                    onRaise();
                    setOpen(false);
                    setKeyboardOpen(false);
                  }}
                >
                  Raise
                </div>
                <div className={styles.raiseButtonBack} />
              </span>
            </div>
            <div className={styles.raiseAction}>
              <div>1/2</div>
              <div>3/4</div>
              <div>Pot</div>
              <div>Max</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.raiseField}
          style={{ maxHeight: open ? '400px' : '0px' }}
        >
          <div className={styles.raisePanel}>
            <div
              className={styles.closeIcon}
              style={{ display: open ? 'flex' : 'none' }}
              onClick={() => {
                setOpen(false);
                setKeyboardOpen(false);
              }}
            >
              <FaChevronDown fontSize="20px" />
            </div>
            <div className={styles.raiseInput}>
              <div className={styles.title}>Your Bet:</div>
              <span className={styles.inputContainer}>
                <input
                  className="raise"
                  type="numeric"
                  value={raiseamount}
                  onChange={(event) => {
                    setRaiseAmount(Number(event.target.value));
                  }}
                  onClick={() => setKeyboardOpen(true)}
                />
                <Image
                  src="/images/freecoin.svg"
                  alt="freecoin"
                  width={44}
                  height={44}
                />
              </span>
              <span style={{ display: 'flex' }}>
                <div
                  className={styles.raiseButton}
                  onClick={() => {
                    onRaise();
                    setOpen(false);
                    setKeyboardOpen(false);
                  }}
                >
                  Raise
                </div>
                <div className={styles.raiseButtonBack} />
              </span>
            </div>
            <div className={styles.raiseAction}>
              <div>1/2</div>
              <div>3/4</div>
              <div>Pot</div>
              <div>Max</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseSetting;
