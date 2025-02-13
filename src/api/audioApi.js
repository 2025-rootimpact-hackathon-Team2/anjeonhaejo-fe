import { get } from './base';
import { AUDIO_URL } from '@constants/endPoint';

export const getAudioAll = async () => {
  const response = await get(AUDIO_URL.all);
  return response.data;
}
