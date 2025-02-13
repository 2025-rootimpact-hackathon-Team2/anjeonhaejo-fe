import { useEffect, useState } from 'react';
import styles from './MonthReport.module.css';
import Decibel from './components/Decibel';
import Issue from './components/Issue';
import MonthTrend from './components/MonthTrend';
import Safety from './components/Safety';
import useDecibelData from '../../hooks/DecibelHooks';

const MonthReport = () => {
  const [formattedDate, setFormattedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const { minDecibel, maxDecibel, avgDecibel, trendDecibel, loading, error } =
    useDecibelData(formattedDate);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.decibelBox}>
        <Decibel
          title="월간 평균 데시벨"
          decibel={avgDecibel}
          color="#3A37EF"
        ></Decibel>
        <Decibel
          title="최고 소음 레벨"
          decibel={maxDecibel}
          color="#FF4747"
        ></Decibel>
        <Decibel
          title="최저 소음 레벨"
          decibel={minDecibel}
          color="#18CE55"
        ></Decibel>
      </div>
      <MonthTrend />
      <Issue />
      <Safety />
    </div>
  );
};

export default MonthReport;
