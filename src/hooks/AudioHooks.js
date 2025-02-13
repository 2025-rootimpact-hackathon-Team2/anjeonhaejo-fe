import { useEffect, useState } from 'react';
import { getAudioAll } from '@api/audioApi';
import { DECIBEL_LEVEL } from '@constants/content';
import { format } from 'date-fns';

export const useAudio = () => {
  const [audioDatas, setAudioDatas] = useState([]);
  const [noiseLogCount, setNoiseLogCount] = useState(0);
  const [timeLinedatas, setTimeLinedatas] = useState([]);
  const [noiseChartData, setNoiseChartData] = useState([]);
  const timeTransform = (timestamp) => {
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm');
  }

  const transformAudioDataDate = (data) => {
    const formattedTime = timeTransform(data.timestamp);
    const [date, time] = formattedTime.split(' ');
    const [hour, minute] = time.split(':');
    
    return {
      ...data,
      date,
      hour,
      minute
    };
  }

  const filterTodayData = (transformedData) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayAudioDatas = transformedData.filter(data => data.date === today);
    return todayAudioDatas;
  }

  const getNoiseTimelineData = (todayData) => {
    return todayData.filter(data => data.decibel >= DECIBEL_LEVEL.WARNING);
  }

  const getNoiseChartData = (todayData) => {
    return todayData.map(data => ({
      x: `${data.hour}:${data.minute}`, 
      y: data.decibel
    }));
  }

  const fetchAudioDatas = async () => {
    try {
      const response = await getAudioAll();
      setAudioDatas(response);
    } catch (error) {
      console.error('Error fetching audio data:', error);
    }
  }
  
  useEffect(() => {
    if (audioDatas?.length > 0) {
      const transformedData = audioDatas.map(data => transformAudioDataDate(data));
      const todayData = filterTodayData(transformedData);
      const noiseTimelineData = getNoiseTimelineData(todayData);
      setTimeLinedatas(noiseTimelineData);
      const noiseLogCount = noiseTimelineData.length;
      setNoiseLogCount(noiseLogCount);
      const noiseChartData = getNoiseChartData(todayData);
      setNoiseChartData(noiseChartData);
    }
  }, [audioDatas])

  useEffect(() => {
    fetchAudioDatas();
  }, []);

  return { 
    noiseLogCount,
    timeLinedatas,
    noiseChartData
  };
}
