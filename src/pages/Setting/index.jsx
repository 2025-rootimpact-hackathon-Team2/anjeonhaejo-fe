import styles from './Setting.module.css';
import { Mypage } from './components/Mypage';
import { General } from './components/General';
import { SystemInfo } from './components/SystemInfo';

const Setting = () => {
  return (
    <div className={styles.container}>
      <div className={styles.setting}>
        <Mypage />
        <General />
        <SystemInfo />
        <button className={styles.confirmButton}>확인</button>
      </div>
    </div>
  )
}

export default Setting; 
