import { Outlet } from 'react-router-dom';
import MobileHeader from './MobileHeader';

const MobileLayout = () => {
  return (
    <div>
      <MobileHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MobileLayout;
