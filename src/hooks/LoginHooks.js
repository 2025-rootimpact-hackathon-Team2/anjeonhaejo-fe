import { useEffect, useState } from 'react';
import { loginApi } from '@api/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@store/slices/userSlice';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginApi({ email, password });
      if (response.status === 200) {
        const role = response.data.role === 'MANAGER' ? '관리자' : '작업자';
        dispatch(login({ email: email, name: response.data.name, role: role, factory: response.data.factory, department: response.data.department }));
        navigate('/');
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { email, password, setEmail, setPassword, handleLogin };
};
