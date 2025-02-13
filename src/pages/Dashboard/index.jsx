import styles from './Dashboard.module.css';
import Timeline from "./components/Timeline";
import NoiseLog from "./components/NoiseLog";
import DecibelChart from "./components/DecibelChart";
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
      <div className={styles.top}>
        <Timeline timeLinedatas={timeLinedatas} />
        <NoiseLog noiseLogCount={noiseLogCount} />
      </div>
      <DecibelChart />
      <NoiseChart noiseChartData={noiseChartData} />
    </div>
  )
}

export default Dashboard;