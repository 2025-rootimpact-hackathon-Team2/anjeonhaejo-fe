import { useState, useEffect } from 'react';
import { get } from '../api/base';

const useDecibelData = (formattedDate) => {
  const [minDecibel, setMinDecibel] = useState(null);
  const [maxDecibel, setMaxDecibel] = useState(null);
  const [avgDecibel, setAvgDecibel] = useState(null);
  const [trendDecibel, setTrendDecibel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [minResponse, maxResponse, avgResponse, trendResponse] =
          await Promise.all([
            get('/api/v1/noises/min?date=' + formattedDate),
            get('/api/v1/noises/max?date=' + formattedDate),
            get('/api/v1/noises/average?date=' + formattedDate),
            get('/api/v1/noises/trend?date=' + formattedDate),
          ]);

        setMinDecibel(minResponse.data.minDecibel);
        setMaxDecibel(maxResponse.data.maxDecibel);
        setAvgDecibel(avgResponse.data.averageDecibel);
        setTrendDecibel(trendResponse.data.dailyAverageDecibels);
      } catch (err) {
        setError('Error fetching data');
        console.error('Get fetched error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formattedDate]);

  return { minDecibel, maxDecibel, avgDecibel, trendDecibel, loading, error };
};

export default useDecibelData;
