import styles from './Header.module.css';
import { Logo } from '@assets/images';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  
  const [today, setToday] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div 
        className={styles.logo} 
        onClick={() => navigate('/')}
      >
        <Logo />
      </div>
      <p className={styles.date}>{today}</p>
    </div>
  );
};

export default Header;
