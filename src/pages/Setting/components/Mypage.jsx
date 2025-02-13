import styles from "./Mypage.module.css";

export const Mypage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>마이페이지</p>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <p>이름</p>
          <input type="text" readOnly />
        </div>
        <div className={styles.input}>
          <p>소속 공장</p>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <p>직책</p>
          <select>
            <option value="manager">관리자</option>
          </select>
        </div>
        <div className={styles.input}>
          <p>부서 정보</p>
          <select>
            <option value="manager">안전관리팀</option>
          </select>
        </div>
      </div>
    </div>
  );
};
