import styles from './Setting.module.css';
import { Mypage } from './components/Mypage';
import { General } from './components/General';
import { SystemInfo } from './components/SystemInfo';
import { useUser } from '@hooks/UserHooks';

const Setting = () => {
  const { handleSetting, settingValue, setSettingValue } = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.setting}>
        <Mypage
          handleSetting={handleSetting}
          settingValue={settingValue}
          setSettingValue={setSettingValue}
        />
        <General />
        <SystemInfo />
        <button 
          className={styles.confirmButton} 
          onClick={handleSetting}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default Setting; 
