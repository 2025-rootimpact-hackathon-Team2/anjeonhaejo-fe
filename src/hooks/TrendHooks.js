import { useState, useEffect } from 'react';
import { get } from '../api/base';

const useTrendData = (selectedDate) => {
  const [trendData, setTrendData] = useState({
    dailyAverageDecibelA: [],
    dailyAverageDecibelB: [],
    dailyAverageDecibelC: [],
    dailyAverageDecibelD: [],
  });

  const getTrendNoise = async () => {
    try {
      const response = await get('/api/v1/noises/trend?date=' + selectedDate);
      setTrendData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getTrendNoise();
  }, [selectedDate]);

  const updateLabels = (dateString) => {
    const selected = new Date(dateString);
    const year = selected.getFullYear();
    const month = selected.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();

    return Array.from({ length: lastDay }, (_, i) => `${i + 1}`);
  };

  return { trendData, updateLabels };
};

export default useTrendData;
