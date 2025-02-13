import styles from './Loading.module.css';
import Lottie from 'lottie-react';
import loadingAnimation from '@assets/lottie/loadingAnimation.json';

const Loading = () => {
  return (
    <div className={styles.dim}>
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>
          <Lottie 
            animationData={loadingAnimation} 
          loop={true}
          autoplay={true}
        />
        </div>
        <p className={styles.loadingText}>잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}

export default Loading;