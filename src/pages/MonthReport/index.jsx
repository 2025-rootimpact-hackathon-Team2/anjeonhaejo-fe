import styles from './MonthReport.module.css';
import Decibel from './components/Decibel';
import MonthTrend from './components/MonthTrend';

const MonthReport = () => {
  return (
    <div className={styles.container}>
      <div className={styles.decibelBox}>
        <Decibel
          title="월간 평균 데시벨"
          decibel="67.5"
          color="#3A37EF"
        ></Decibel>
        <Decibel
          title="최고 소음 레벨"
          decibel="103.2"
          color="#FF4747"
        ></Decibel>
        <Decibel
          title="최저 소음 레벨"
          decibel="45.8"
          color="#18CE55"
        ></Decibel>
      </div>
      <MonthTrend />
    </div>
  );
};

export default MonthReport;
