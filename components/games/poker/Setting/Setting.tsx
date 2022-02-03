import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import ProgressBar from '../ProgressBar';
import styles from './Setting.module.scss';

interface Props {
  open: boolean;
  setOpen: any;
}

interface ItemFieldProps {
  type?: number;
}

const ItemFieldNew = (props: { children: any, type: number }) => {
  return (
    <div
      className={styles.itemField}
      style={{
        width: props.type === 0 ? '40px' : props.type === 1 ? '116px' : '90px',
        height: props.type === 0 ? '40px' : props.type === 1 ? '100px' : '36px',
        flexDirection: props.type === 0 ? 'column' : 'row',
        fontSize: props.type === 0 ? '8px' : '14px',
        fontStyle: props.type === 0 ? 'italic' : 'unset',
      }}
    >
      {props.children}
    </div>
  );
};

const ItemField = styled(Box)<ItemFieldProps>(({ type }) => ({
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '800',
  lineHeight: '15px',
  color: 'white',
  width: type === 0 ? '40px' : type === 1 ? '116px' : '90px',
  height: type === 0 ? '40px' : type === 1 ? '100px' : '36px',
  flexDirection: type === 0 ? 'column' : 'row',
  fontSize: type === 0 ? '8px' : '14px',
  fontStyle: type === 0 ? 'italic' : 'unset',
}));

const Setting: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <section
      className={styles.settingBody}
      style={{maxHeight: open ? '600px' : '0px'}}
    >
      <div className={styles.settingField}>
        <div
          className={styles.closeIcon}
          style={{display: open ? 'flex' : 'none'}}
          onClick={() => setOpen(false)}
        >
          <FaChevronDown fontSize="20px" />
        </div>
        <div className={styles.timeCounter}>
          <div className={styles.live}>LIVE</div>
          <div className={styles.hours}>13 Hours Remaining</div>
        </div>
        <div className={styles.title}>Daily ICE Challenges & Tournament Info</div>
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
            <ItemField ml="10px" type={0}>
              <span>1</span>
              <Image src="/images/xp.png" alt="xp" width={17} height={11} />
            </ItemField>
          </div>
        </div>

        <div
          className={styles.property}
          style={{marginTop: '-8px'}}
        >
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
            <ItemField ml="10px" type={0}>
              <span>2</span>
              <Image src="/images/xp.png" alt="xp" width={17} height={11} />
            </ItemField>
          </div>
        </div>

        <div
          className={styles.property}
          style={{marginTop: '-8px', marginBottom: '12px'}}
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
            <ItemField ml="10px" type={0}>
              <span>3</span>
              <Image
                src="/images/xp.png"
                alt="xp"
                width={17}
                height={11}
              />
            </ItemField>
          </div>
        </div>

        <div className={styles.bottomSetting}>
          <div className={styles.itemFieldContainer}>
            <div className={styles.upperTitle}>Expected ICE Earned</div>
            <ItemField type={1}>
              <span>- -&nbsp;&nbsp;</span>
              <div style={{marginTop: "5px"}}>
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
            <ItemField type={2} position="relative">
              <span className={styles.text}>+0</span>
              <div style={{position: "absolute", right: "8px", top: "8px"}}>
                <Image
                  src="/images/freecoin.svg"
                  width={22}
                  height={22}
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
            <ItemField type={2} position="relative">
              <span className={styles.text}>+4,291</span>
              <div style={{ margin: '6px 0px 0px 2px' }}>
                <Image
                  src="/images/freecoin.svg"
                  width={22}
                  height={22}
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
