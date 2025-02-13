import styles from './Header.module.css';
import { Logo } from '@assets/images';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div 
        className={styles.logo} 
        onClick={() => navigate('/')}
      >
        <Logo />
      </div>
    </div>
  );
};

export default Header;
