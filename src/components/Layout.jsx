import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css';
import Sidebar from './Sidebar';
const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;