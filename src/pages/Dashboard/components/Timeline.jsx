import styles from './Timeline.module.css';
import { DangerTriangle, WarningTriangle } from '@assets/icons';

const Timeline = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>Timeline</p>
        <p className={styles.titleSubText}>중요 알림이 표시됩니다.</p>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <div className={styles.contentItemTitle}>
            <DangerTriangle />
            <div className={styles.contentItemTitleText}>
              <p className={styles.contentItemTitleTextLabel}>위험</p>
              <p className={styles.contentItemTitleTextDecibel}>100 dB</p>
            </div>
          </div>
          <div className={styles.contentItemInfo}>
            <div>
              <p className={styles.contentItemInfoLabel}>위치</p>
              <p className={styles.contentItemInfoValue}>
                <span style={{ color: 'var(--color-red)' }}>B</span> 구역
              </p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>특징</p>
              <p className={styles.contentItemInfoValue}>충돌음</p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>시각</p>
              <p className={styles.contentItemInfoValue}>03시 10분</p>
              <p className={styles.contentItemDate}>2024-02-20</p>
            </div>
          </div>
        </div>

        <div className={`${styles.contentItem} ${styles.warning}`}>
          <div className={styles.contentItemTitle}>
            <WarningTriangle />
            <div className={styles.contentItemTitleText}>
              <p className={`${styles.contentItemTitleTextLabel} ${styles.warning}`}>주의</p>
              <p className={styles.contentItemTitleTextDecibel}>88 dB</p>
            </div>
          </div>
          <div className={styles.contentItemInfo}>
            <div>
              <p className={styles.contentItemInfoLabel}>위치</p>
              <p className={styles.contentItemInfoValue}>
                <span style={{ color: 'var(--color-red)' }}>B</span> 구역
              </p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>특징</p>
              <p className={styles.contentItemInfoValue}>충돌음</p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>시각</p>
              <p className={styles.contentItemInfoValue}>01시 00분</p>
              <p className={styles.contentItemDate}>2024-02-20</p>
            </div>
          </div>
        </div>

        <div className={`${styles.contentItem} ${styles.warning}`}>
          <div className={styles.contentItemTitle}>
            <WarningTriangle />
            <div className={styles.contentItemTitleText}>
              <p className={`${styles.contentItemTitleTextLabel} ${styles.warning}`}>주의</p>
              <p className={styles.contentItemTitleTextDecibel}>88 dB</p>
            </div>
          </div>
          <div className={styles.contentItemInfo}>
            <div>
              <p className={styles.contentItemInfoLabel}>위치</p>
              <p className={styles.contentItemInfoValue}>
                <span style={{ color: 'var(--color-red)' }}>B</span> 구역
              </p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>특징</p>
              <p className={styles.contentItemInfoValue}>충돌음</p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>시각</p>
              <p className={styles.contentItemInfoValue}>01시 00분</p>
              <p className={styles.contentItemDate}>2024-02-20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline;