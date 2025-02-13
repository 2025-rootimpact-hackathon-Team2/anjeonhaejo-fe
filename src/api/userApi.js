import { USER_URL } from '@constants/endPoint';
import { post } from './base';

export const loginApi = async (data) => {
  const response = await post(USER_URL.login, data);
  return response;
};

