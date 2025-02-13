import styles from "./Mypage.module.css";

export const Mypage = ({ settingValue, setSettingValue }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>마이페이지</p>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <p>이름</p>
          <input 
            type="text" 
            value={settingValue.name} 
            onChange={(e) => setSettingValue({ ...settingValue, name: e.target.value })} 
          />
        </div>
        <div className={styles.input}>
          <p>소속 공장</p>
          <input 
            type="text" 
            value={settingValue.factory} 
            onChange={(e) => setSettingValue({ ...settingValue, factory: e.target.value })} 
          />
        </div>
        <div className={styles.input}>
          <p>직책</p>
          <select 
            value={settingValue.role} 
            onChange={(e) => setSettingValue({ ...settingValue, role: e.target.value })}
          >
            <option value="MANAGER">관리자</option>
            <option value="WORKER">작업자</option>
          </select>
        </div>
        <div className={styles.input}>
          <p>부서 정보</p>
          <select 
            value={settingValue.department} 
            onChange={(e) => setSettingValue({ ...settingValue, department: e.target.value })}
          >
            <option value="안전관리팀">안전관리팀</option>
            <option value="사업전략팀">사업전략팀</option>
            <option value="경영지원팀">경영지원팀</option>
          </select>
        </div>
      </div>
    </div>
  );
};
