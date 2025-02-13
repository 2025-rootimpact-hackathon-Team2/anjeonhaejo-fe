import styles from "./SystemInfo.module.css";

export const SystemInfo = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>시스템 정보</p>
      <div className={styles.infoItem}>
        <p className={styles.infoItemTitle}>시스템 버전</p>
        <p className={styles.infoItemValue}>1.0.0</p>
      </div>
    </div>
  );
};
