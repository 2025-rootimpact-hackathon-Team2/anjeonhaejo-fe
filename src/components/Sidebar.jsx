import styles from './Sidebar.module.css';
import { Profile, Home, Report , Setting } from '@assets/icons';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Profile />
        <div>
          <p className={styles.name}>김누구</p>
          <p>관리자 (manager)</p>
        </div>
      </div>
      <div className={styles.sidebarMenu}>
        <div className={`${styles.menuItem} ${styles.selected}`}>
          <Home selected={true} />
          <p>대시보드</p>
        </div>
        <div className={styles.menuItem}>
          <Report />
          <p>월별 분석 리포트</p>
        </div>
        <div className={styles.menuItem}>
          <Setting />
          <p>설정</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
