import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@store/slices/userSlice';

export const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
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

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      dispatch(logout());
      navigate('/login');
    }
  }

  return {
    user,
    selected,
    handleMenuClick,
    handleLogout,
  }
}