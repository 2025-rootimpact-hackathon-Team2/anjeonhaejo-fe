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
import { useState } from 'react';
import useTrendData from '../../../hooks/TrendHooks';

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
  const { trendData, updateLabels } = useTrendData(selectedDate);

  const labels = updateLabels(selectedDate);
  const regions = ['A', 'B', 'C', 'D'];

  const datasets = regions.map((region) => {
    const regionData = labels.map((day) => {
      const entry = trendData[`dailyAverageDecibel${region}`].find(
        (data) =>
          data.localDate ===
            `${selectedDate.split('-')[0]}-${
              selectedDate.split('-')[1]
            }-${day}` && data.zone === region
      );
      return entry ? entry.averageDecibel : null;
    });

    const getRegionColor = (region) => {
      switch (region) {
        case 'A':
          return '#1C8EFF';
        case 'B':
          return '#C050FC';
        case 'C':
          return '#FCBE2F';
        case 'D':
          return '#9F9FF8';
        default:
          return '#000000';
      }
    };

    return {
      label: `${region}구역`,
      data: regionData,
      borderColor: getRegionColor(region),
      backgroundColor: '#ffffff',
      borderWidth: 3,
      tension: 0,
      spanGaps: true,
      pointRadius: 6,
      pointBorderWidth: 5,
    };
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: labels,
      },
      y: {
        beginAtZero: false,
        min: 75,
        max: 125,
        stepSize: 10,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <p className={styles.title}>월별 소음 트렌드</p>
        <div className={styles.legend}>
          {regions.map((region) => (
            <div key={region} className={styles.legendItem}>
              {region}구역
            </div>
          ))}
        </div>
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
          lang="en"
        />
      </div>
      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthTrend;
