import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  type: number;
  percent: number;
  text: string;
  width?: string;
  height?: number;
}

const ProgressBar: React.FC<Props> = ({ type, percent, text, width }) => {
  const backgrounds = [
    'radial-gradient(227.45% 196.14% at 21.78% -82.5%, #FF8FD9 0%, #865DFF 56.25%, #4021FF 94.65%)',
    'radial-gradient(195.01% 168.18% at 22.02% -54.55%, #93F8FF 0%, #5882FF 62.16%, #2144FF 94.65%)',
    'radial-gradient(166.55% 143.64% at 22.09% -30%, #C6FFEA 0%, #5CDAEA 56.25%, #21AFFF 94.65%)',
  ];
  const offset = useRef<any>();

  const [curpercent, setCurPercent] = useState(percent);
  const [curtext, setCurText] = useState(text);
  const [ismove, setIsMove] = useState(false);

  const MoveAction = (event: any, click?: any) => {
    if (!ismove && !click && event.type !== 'touchmove') return;
    const { offsetLeft, offsetWidth } = offset.current;
    const textlist = text.includes('/') ? text.split('/') : text.split(' of ');
    const per = offsetWidth / Number(textlist[1]);
    const times = Math.min(
      Number(textlist[1]),
      Math.max(
        0,
        Math.ceil(
          ((event.type === 'touchmove'
            ? event.changedTouches[0].clientX
            : event.clientX) -
            offsetLeft) /
            per
        )
      )
    );
    setCurPercent(times * per);
    if (text.includes('/')) setCurText(`${times}/${textlist[1]}`);
    else setCurText(`${times} of ${textlist[1]}`);
  };

  useEffect(() => {
    if (offset.current) {
      const { offsetWidth } = offset.current;
      setCurPercent(percent * offsetWidth);
    }
  }, [offset, percent]);

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (offset.current && !offset.current.contains(event.target)) {
        setIsMove(false);
      }
    });
  }, []);

  const handleClick = (event: any) => {
    setIsMove(true);
    MoveAction(event, true);
  };

  const handleUp = () => {
    setIsMove(false);
  };

  return (
    <div
      className={styles.progressBarBack}
      style={{ width: width }}
      onMouseDown={(e) => handleClick(e)}
      onTouchMove={(e) => MoveAction(e)}
      onMouseMove={(e) => MoveAction(e)}
      onMouseUp={() => handleUp()}
      ref={offset}
    >
      <div
        className={styles.progress}
        style={{
          width: curpercent,
          background: backgrounds[type],
        }}
      />
      <div
        className={styles.title}
        style={{
          fontSize: curtext.includes('/') ? '8px' : '10px',
          right: curtext.includes('/') ? '5px' : '-36px',
          color: curtext.includes('/') ? 'white' : 'rgb(255,255,255,0.75)',
        }}
      >
        {curtext}
      </div>
    </div>
  );
};

export default ProgressBar;
