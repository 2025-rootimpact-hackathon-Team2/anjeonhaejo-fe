import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './MonthTrend.module.css';
import { options } from '@constants/LineChartOption';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthTrend = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const updateLabels = (dateString) => {
    const selected = new Date(dateString);
    const year = selected.getFullYear();
    const month = selected.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();

    return Array.from({ length: lastDay }, (_, i) => `${i + 1}`);
  };

  const labels = updateLabels(selectedDate);

  const today = new Date().toISOString().split('T')[0];

  const data = {
    labels,
    datasets: [
      {
        label: 'A구역',
        // 예시 데이터 - 실제 데이터로 교체 필요
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          111,
          115,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        borderColor: '#1C8EFF',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        tension: 0,
        spanGaps: true,
        pointRadius: 6,
        pointBorderWidth: 5,
      },
      {
        label: 'B구역',
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        borderColor: '#C050FC',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        tension: 0,
        spanGaps: true,
        pointRadius: 6,
        pointBorderWidth: 5,
      },
      {
        label: 'C구역',
        data: [
          null,
          null,
          null,
          null,
          94,
          null,
          99,
          103,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        borderColor: '#FCBE2F',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        tension: 0,
        spanGaps: true,
        pointRadius: 6,
        pointBorderWidth: 5,
      },
      {
        label: 'D구역',
        data: [
          null,
          null,
          null,
          100,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          103,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        borderColor: '#9F9FF8',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        tension: 0,
        spanGaps: true,
        pointRadius: 6,
        pointBorderWidth: 5,
      },
    ],
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <p className={styles.title}>월별 소음 트렌드</p>
        <div className={styles.legend}>
          <div className={styles.legendItem}>A구역</div>
          <div className={styles.legendItem}>B구역</div>
          <div className={styles.legendItem}>C구역</div>
          <div className={styles.legendItem}>D구역</div>
        </div>
        <input type="date" defaultValue={today} lang="en" />
      </div>
      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthTrend;
