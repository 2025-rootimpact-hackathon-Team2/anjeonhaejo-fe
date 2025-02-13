import styles from './Sidebar.module.css';
import { Profile, Home, Report, Setting, Logout } from '@assets/icons';
import { useSidebar } from '@hooks/SidebarHooks';

const Sidebar = () => {
  const { selected, handleMenuClick, handleLogout, user } = useSidebar();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Profile />
        <div>
          <p className={styles.name}>{user.name}</p>
          <p>{user.role}</p>
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          <Logout />
        </div>
      </div>
      <div className={styles.sidebarMenu}>
        <div 
          className={`${styles.menuItem} ${selected === 'home' ? styles.selected : ''}`} 
          onClick={() => handleMenuClick('home')}
        >
          <Home selected={selected === 'home'} />
          <p>대시보드</p>
        </div>
        <div 
          className={`${styles.menuItem} ${selected === 'report' ? styles.selected : ''}`} 
          onClick={() => handleMenuClick('report')}
        >
          <Report selected={selected === 'report'} />
          <p>월별 분석 리포트</p>
        </div>
        <div 
          className={`${styles.menuItem} ${selected === 'setting' ? styles.selected : ''}`} 
          onClick={() => handleMenuClick('setting')}
        >
          <Setting selected={selected === 'setting'} />
          <p>설정</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
