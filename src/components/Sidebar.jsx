import styles from './Sidebar.module.css';
import { Profile, Home, Report, Setting, Logout } from '@assets/icons';
import { useSidebar } from '@hooks/SidebarHooks';
import Lottie from "lottie-react";
import recordAnimation from '@assets/lottie/recordAnimation.json';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import useDecibel from '@hooks/DecibelHooks';
import Modal from '@components/Modal';
import Loading from '@components/Loading';

const Sidebar = () => {
  const { selected, handleMenuClick, handleLogout, user } = useSidebar();
  const decibel = useSelector((state) => state.decibel.value);
  const isRecording = useSelector((state) => state.decibel.isRecording);
  const { startRecording, isModalOpen, setIsModalOpen, handleConfirm, handleCancel, isLoading } = useDecibel();
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
    }
  }, [isRecording]);

  return (
    <div className={styles.sidebar}>
      {isModalOpen && 
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      }
      {!isModalOpen && isRecording && isLoading && <Loading />}
      <div className={styles.sidebarHeader}>
        <Profile />
        <div>
          <p className={styles.name}>{user.name}</p>
          <p>{user.role === 'MANAGER' ? '관리자' : '작업자'}</p>
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
      <div className={styles.sidebarFooter} onClick={startRecording}>
        <div className={styles.recordIcon}>
          <Lottie 
            animationData={recordAnimation} 
            loop={isRecording}
            autoplay={false}
            lottieRef={lottieRef}
          />
        </div>
        <div className={styles.decibel}>
          <p>
            {isRecording ? decibel.toFixed(1) + ' dB' : '녹음 시작'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
