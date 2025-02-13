import styles from './Dashboard.module.css';
import Timeline from "./components/Timeline";
import NoiseLog from "./components/NoiseLog";
import NoiseChart from "./components/NoiseChart";
import { useAudio } from '@hooks/AudioHooks';

const Dashboard = () => {
  const { 
    timeLinedatas,
    noiseLogCount,
    noiseChartData 
  } = useAudio();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Timeline timeLinedatas={timeLinedatas} />
        <NoiseLog noiseLogCount={noiseLogCount} />
      </div>
      <NoiseChart noiseChartData={noiseChartData} />
    </div>
  )
}

export default Dashboard;