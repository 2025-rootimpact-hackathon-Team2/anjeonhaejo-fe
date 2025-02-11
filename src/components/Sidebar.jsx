import styles from './Sidebar.module.css';
import { Profile, Home, Report, Setting } from '@assets/icons';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/report') return 'report';
    if (path === '/setting') return 'setting';
    return 'home';
  });

  const handleMenuClick = (menu) => {
    setSelected(menu);
    switch (menu) {
      case 'home':
        navigate('/');
        break;
      case 'report':
        navigate('/report');
        break;
      case 'setting':
        navigate('/setting');
        break;
      default:
        navigate('/');
    }
  }

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
