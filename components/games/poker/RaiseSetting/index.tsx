import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import styles from './RaiseSetting.module.scss';

interface RaiseSettingProps {
  open: boolean;
  setOpen: any;
  setRaiseAmount: any;
  raiseamount: number;
  onRaise: any;
  pot: number;
  maxBalance: number;
}

const RaiseSetting: React.FC<RaiseSettingProps> = (props) => {
  const {
    open,
    setOpen,
    raiseamount,
    setRaiseAmount,
    onRaise,
    pot,
    maxBalance,
  } = props;
  return (
    <div>
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
              />
              <Image
                src="/images/freecoin.svg"
                alt="freecoin"
                width={26}
                height={26}
              />
            </span>
            <span style={{ display: 'flex' }}>
              <div
                className={styles.raiseButton}
                onClick={() => {
                  onRaise();
                  setOpen(false);
                }}
              >
                Raise
              </div>
              <div className={styles.raiseButtonBack} />
            </span>
          </div>
          <div className={styles.raiseAction}>
            <div
              onClick={() => {
                setRaiseAmount(Math.round(pot / 2));
              }}
            >
              1/2
            </div>
            <div
              onClick={() => {
                setRaiseAmount(Math.round(pot * (3 / 4)));
              }}
            >
              3/4
            </div>
            <div
              onClick={() => {
                setRaiseAmount(pot);
              }}
            >
              Pot
            </div>
            <div
              onClick={() => {
                setRaiseAmount(maxBalance);
              }}
            >
              Max
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseSetting;
