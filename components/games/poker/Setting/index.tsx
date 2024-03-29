import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import { ProgressBar } from '@/components/games/poker';
import styles from './Setting.module.scss';

interface SettingProps {
  open: boolean;
  setOpen: any;
}

interface ItemFieldProps {
  children: any;
  type: number;
  style?: any;
}

const ItemField: React.FC<ItemFieldProps> = (props) => {
  const { children, type, style } = props;
  return (
    <div
      className={styles.itemField}
      style={{
        ...style,
        width: type === 0 ? '40px' : type === 1 ? '116px' : '90px',
        height: type === 0 ? '40px' : type === 1 ? '100px' : '36px',
        flexDirection: type === 0 ? 'column' : 'row',
        fontSize: type === 0 ? '8px' : '14px',
        fontStyle: type === 0 ? 'italic' : 'unset',
      }}
    >
      {children}
    </div>
  );
};

const Setting: React.FC<SettingProps> = (props) => {
  const { open, setOpen } = props;
  return (
    <section
      className={styles.settingBody}
      style={{ maxHeight: open ? '600px' : '0px' }}
    >
      <div className={styles.settingField}>
        <div
          className={styles.closeIcon}
          style={{ display: open ? 'flex' : 'none' }}
          onClick={() => setOpen(false)}
        >
          <FaChevronDown fontSize="20px" />
        </div>
        <div className={styles.timeCounter}>
          <div className={styles.live}>LIVE</div>
          <div className={styles.hours}>13 Hours Remaining</div>
        </div>
        <div className={styles.title}>
          Daily ICE Challenges & Tournament Info
        </div>
        <div className={styles.property}>
          <div className={styles.progress}>
            <div>See the flop 15 times</div>
            <ProgressBar
              type={0}
              percent={7 / 15}
              text="7 of 15"
              width="179px"
            />
          </div>
          <div className={styles.itemFieldContainer}>
            <ItemField type={0}>
              <span>200</span>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField type={0} style={{ marginLeft: '10px' }}>
              <span>1</span>
              <Image src="/images/xp.png" alt="xp" width={17} height={11} />
            </ItemField>
          </div>
        </div>

        <div className={styles.property} style={{ marginTop: '-8px' }}>
          <div className={styles.progress}>
            <div>Win a hand 5 times</div>
            <ProgressBar type={1} percent={0 / 5} text="0 of 5" width="179px" />
          </div>
          <div className={styles.itemFieldContainer}>
            <ItemField type={0}>
              <span>750</span>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField type={0} style={{ marginLeft: '10px' }}>
              <span>2</span>
              <Image src="/images/xp.png" alt="xp" width={17} height={11} />
            </ItemField>
          </div>
        </div>

        <div
          className={styles.property}
          style={{ marginTop: '-8px', marginBottom: '12px' }}
        >
          <div className={styles.progress}>
            <div>Get a 3 of a kind 2 times</div>
            <ProgressBar type={2} percent={0 / 2} text="0 of 2" width="179px" />
          </div>
          <div className={styles.itemFieldContainer}>
            <ItemField type={0}>
              <span>1000</span>
              <Image
                src="/images/diamond.svg"
                alt="diamond"
                width={18}
                height={15}
              />
            </ItemField>
            <ItemField type={0} style={{ marginLeft: '10px' }}>
              <span>3</span>
              <Image src="/images/xp.png" alt="xp" width={17} height={11} />
            </ItemField>
          </div>
        </div>

        <div className={styles.bottomSetting}>
          <div className={styles.itemFieldContainer}>
            <div className={styles.upperTitle}>Expected ICE Earned</div>
            <ItemField type={1}>
              <span>- -&nbsp;&nbsp;</span>
              <div style={{ marginTop: '5px' }}>
                <Image
                  src="/images/diamond.svg"
                  width={18}
                  height={18}
                  alt="diamond"
                />
              </div>
            </ItemField>
          </div>
          <div className={styles.itemFieldContainer}>
            <div className={styles.upperTitle}>Net Chips</div>
            <ItemField type={2} style={{ position: 'relative' }}>
              <span className={styles.text}>+0</span>
              <div style={{ position: 'absolute', right: '8px', top: '11px' }}>
                <Image
                  src="/images/freecoin.svg"
                  width={15}
                  height={15}
                  alt="freecoin"
                />
              </div>
            </ItemField>
            <div className={styles.lowerTitle}>ICE Multiplier</div>
            <ItemField type={2}>
              <span className={styles.text}>1.45x</span>
            </ItemField>
          </div>
          <div className={styles.itemFieldContainer}>
            <div className={styles.upperTitle}>Percentile</div>
            <ItemField type={2}>
              <span className={styles.text}>Top 10%</span>
            </ItemField>
            <div className={styles.lowerTitle}>Next Tier</div>
            <ItemField type={2} style={{ position: 'relative' }}>
              <span className={styles.text} style={{ marginLeft: '2px' }}>
                +4,291
              </span>
              <div style={{ marginLeft: '4px', marginTop: '4px' }}>
                <Image
                  src="/images/freecoin.svg"
                  width={15}
                  height={15}
                  alt="freecoin"
                />
              </div>
            </ItemField>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setting;
