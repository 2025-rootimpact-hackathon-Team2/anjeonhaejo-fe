import { useState } from 'react';
import { loginApi } from '@api/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateUser } from '@store/slices/userSlice';
import { updateUserApi } from '@api/userApi';

export const useUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user.value);
  const [settingValue, setSettingValue] = useState({
    name: user.name,
    factory: user.factory,
    role: user.role,
    department: user.department,
  });

  const handleLogin = async () => {
    try {
      const response = await loginApi({ email, password });
      if (response.status === 200) {
        dispatch(login({ 
          email: email, 
          name: response.data.name, 
          role: response.data.role, 
          factory: response.data.factory, 
          department: response.data.department,
          id: response.data.id
        }));
        navigate('/');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetting = async () => {
    try {
      const response = await updateUserApi(user.id, settingValue);
      if (response.status === 200 || response.status === 201) {
        dispatch(updateUser({
          name: settingValue.name,
          factory: settingValue.factory,
          role: settingValue.role,
          department: settingValue.department,
        }));
        alert('설정이 완료되었습니다.');
      } else {
        console.log('설정 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { 
    email, 
    password, 
    user, 
    settingValue,
    setEmail, 
    setPassword, 
    handleLogin, 
    setSettingValue, 
    handleSetting 
  };
};
