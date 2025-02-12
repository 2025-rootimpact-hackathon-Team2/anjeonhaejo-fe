import styles from './NoiseLog.module.css';
import { DangerTriangleSmall, CheckCircleSmall } from '@assets/icons';

const NoiseLog = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>소음 횟수</p>
      <table>
        <thead>
          <tr>
            <th>위치</th>
            <th>기계</th>
            <th>임계값 초과 횟수</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A 구역</td>
            <td>
              <p>컨베이너 벨트</p>
              <p>용광로</p>
            </td>
            <td>
              <span className={styles.countWarning}>6</span>
              <span>회</span>
            </td>
            <td>
              <DangerTriangleSmall />
            </td>
          </tr>
          <tr>
            <td>B 구역</td>
            <td>
              <p>압연기</p>
              <p>크레인</p>
            </td>
            <td>
              <span className={styles.countWarning}>2</span>
              <span>회</span>
            </td>
            <td>
              <CheckCircleSmall />
            </td>
          </tr>
          <tr>
            <td>C 구역</td>
            <td>
              <p>펌프</p>
              <p>냉각기</p>
            </td>
            <td>
              <span>0</span>
              <span>회</span>
            </td>
            <td>
              <CheckCircleSmall />
            </td>
          </tr>
          <tr>
            <td>D 구역</td>
            <td>
              <p>지게차</p>
            </td>
            <td>
              <span>0</span>
              <span>회</span>
            </td>
            <td>
              <CheckCircleSmall />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NoiseLog;
