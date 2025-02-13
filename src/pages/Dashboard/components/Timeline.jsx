import styles from './Timeline.module.css';
import { DangerTriangle, WarningTriangle } from '@assets/icons';
import { DECIBEL_LEVEL, WORKER_ZONE, SOUND_CLASS } from '@constants/content';

const Timeline = ({ timeLinedatas }) => {
  const workerZone = WORKER_ZONE.map(data => data.id);
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>Timeline</p>
        <p className={styles.titleSubText}>중요 알림이 표시됩니다.</p>
      </div>
      <div className={styles.content}>
        {timeLinedatas.map((data, index) => (
          <div className={`${styles.contentItem} ${data.decibel >= DECIBEL_LEVEL.DANGER ? styles.danger : styles.warning}`}  key={index}>
            <div className={styles.contentItemTitle}>
              {data.decibel >= DECIBEL_LEVEL.DANGER ? <DangerTriangle /> : <WarningTriangle />}
            <div className={styles.contentItemTitleText}>
              <p className={styles.contentItemTitleTextLabel}>
                {data.decibel >= DECIBEL_LEVEL.DANGER ? '위험' : '주의'}
              </p>
              <p className={styles.contentItemTitleTextDecibel}>{data.decibel} dB</p>
            </div>
          </div>
          <div className={styles.contentItemInfo}>
            <div>
              <p className={styles.contentItemInfoLabel}>위치</p>
              <p className={styles.contentItemInfoValue}>
                <span style={{ color: 'var(--color-red)' }}>{workerZone[data.workerZone - 1]}</span> 구역
              </p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>특징</p>
              <p className={styles.contentItemInfoValue}>
                {SOUND_CLASS[data.soundClass] || data.soundClass}
              </p>
            </div>
            <div>
              <p className={styles.contentItemInfoLabel}>시각</p>
              <p className={styles.contentItemInfoValue}>{data.hour}시 {data.minute}분</p>
              <p className={styles.contentItemDate}>{data.date}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline;