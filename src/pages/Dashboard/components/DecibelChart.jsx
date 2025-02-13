import styles from './DecibelChart.module.css';
import { options } from '@constants/DecibelChartOption';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const DecibelChart = () => {
  const decibel = useSelector((state) => state.decibel.value);
  
  // 구역 데이터를 객체로 구조화
  const zoneData = {
    A: { pattern: Array(30).fill(0), current: decibel },
    B: { pattern: [85, 87, 86, 88, 85, 89, 87, 86, 88, 85, 87, 86, 85, 88, 89], current: 85 },
    C: { pattern: [92, 90, 93, 91, 94, 90, 92, 93, 91, 90, 94, 92, 91, 93, 90], current: 92 },
    D: { pattern: [78, 80, 79, 81, 78, 82, 80, 79, 81, 78, 80, 79, 78, 81, 82], current: 78 }
  };

  // 차트 데이터 생성 함수
  const createChartData = (pattern) => ({
    labels: Array(pattern.length).fill(''),
    datasets: [{
      data: pattern,
      borderColor: '#1CD65A',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(28, 214, 90, 0.1)',
      pointRadius: 0,
    }]
  });

  const [aData, setAData] = useState(createChartData(zoneData.A.pattern));

  useEffect(() => {
    setAData((prevData) => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: [...prevData.datasets[0].data.slice(1), decibel],
      }],
    }));
  }, [decibel]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>실시간 이상소음 감지</p>
      </div>
      <div className={styles.chartContainer}>
        {Object.entries(zoneData).map(([zone, { current }]) => (
          <div key={zone} className={styles.chartItem}>
            <div className={styles.worker}>{zone} 구역</div>
            <div className={styles.decibel}>
              {(zone === 'A' ? decibel : current).toFixed(1)} dB
            </div>
            <div className={styles.chart}>
              <Line 
                options={options} 
                data={zone === 'A' ? aData : createChartData(zoneData[zone].pattern)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecibelChart;

