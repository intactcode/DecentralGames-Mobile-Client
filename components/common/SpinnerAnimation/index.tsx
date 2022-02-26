import Lottie from 'react-lottie';
import { useStoreState } from '@/hooks/Hooks';
import loadingData from './loadingData.json';
import styles from './SpinnerAnimation.module.scss';

interface SpinnerAnimationProps {
  width?: number;
  height?: number;
}

const SpinnerAnimation: React.FC<SpinnerAnimationProps> = (props) => {
  const { width = 30, height = 30 } = props;
  const state = useStoreState(); // returns global state from Context API store
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return state.isLoading ? (
    <div className={styles.spinnerAnimation}>
      <Lottie options={loadingOptions} height={height} width={width} />
    </div>
  ) : (
    <></>
  );
};

export default SpinnerAnimation;
