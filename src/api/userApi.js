import { USER_URL } from '@constants/endPoint';
import { post, put } from './base';

export const loginApi = async (data) => {
  const response = await post(USER_URL.login, data);
  return response;
};

export const updateUserApi = async (id, data) => {
  const response = await put(USER_URL.mypage(id), data);
  return response;
};
