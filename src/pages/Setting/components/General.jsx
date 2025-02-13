import styles from "./General.module.css";

export const General = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>일반설정</p>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <p>시간설정</p>
          <select>
            <option value="KR">KR 08:00 Time</option>
          </select>
        </div>
        <div className={styles.input}>
          <p>언어</p>
          <select>
            <option value="KR">한국어</option>
          </select>
        </div>
        <div className={styles.input}>
          <p>알림설정</p>
          <div className={styles.alarmContainer}>
            <div className={styles.alarmCheckContainer}>
              <input type="checkbox" checked={true} />
              <p>푸시 알림</p>
            </div>
            <div className={styles.alarmCheckContainer}>
              <input type="checkbox" checked={true} />
              <p>사고 알림</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
