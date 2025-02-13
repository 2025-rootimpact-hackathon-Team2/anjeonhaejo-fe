import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css';
const HeaderLayout = () => {
  return (
    <div className={styles.headerLayout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderLayout;