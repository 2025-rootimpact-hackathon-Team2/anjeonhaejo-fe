import styles from './Dashboard.module.css';
import Timeline from "./components/Timeline";
import NoiseLog from "./components/NoiseLog";
import NoiseChart from "./components/NoiseChart";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Timeline />
        <NoiseLog />
      </div>
      <NoiseChart />
    </div>
  )
}

export default Dashboard;