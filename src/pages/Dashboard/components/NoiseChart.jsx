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
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import styles from './NoiseChart.module.css';
import { options } from '@constants/LineChartOption';
import { WORKER_ZONE } from '@constants/content';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const createDataset = (worker, color, data = Array(24).fill(null)) => ({
  label: `${worker}구역`,
  data,
  borderColor: color,
  backgroundColor: '#ffffff',
  borderWidth: 0,
  tension: 0,
  spanGaps: true,
  pointRadius: 10.5,
  pointBorderWidth: 8,
});

const NoiseChart = ({ noiseChartData }) => {
  const noiseChartTempData = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 102, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 103, null, null, null, null, null, null, null],
  ]

  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
    datasets: WORKER_ZONE.map(({ id, color }, index) => 
      createDataset(id, color, index === 0 ? noiseChartData : noiseChartTempData[index - 1])
    ),
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>
          실시간 소음 레벨 (Noise)
        </p>
        <div className={styles.legend}>
          <div className={styles.legendItem}>A구역</div>
          <div className={styles.legendItem}>B구역</div>
          <div className={styles.legendItem}>C구역</div>
          <div className={styles.legendItem}>D구역</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default NoiseChart;