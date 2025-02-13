import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const isLogin = user.email;

  if (!isLogin) {
    return <Navigate replace to="/login" />;
  }

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
