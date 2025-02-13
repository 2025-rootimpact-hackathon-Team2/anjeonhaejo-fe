import React from 'react';
import styles from './Issue.module.css';

export default function Issue() {
  return (
    <section className={styles.section}>
      <h1>주요 이슈 및 개선 조치</h1>
      <table>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>발생일</th>
            <th>주요 이슈</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>
              A구역에서 원료 분쇄기 과열로 인한 분진 폭발
              <br />
              <span>분진 농도 모니터링 시스템 설치 및 자동 소화 장치 도입</span>
            </td>
            <td>
              <span style={{ backgroundColor: '#FF5733' }}>즉시조치 필요</span>
            </td>
          </tr>
          <tr>
            <td>2024-02-22 / 15:00</td>
            <td>
              B구역에서 제련로 내 금속 용융물 폭발
              <br />
              <span>
                온도 및 조성 실시간 모니터링 시스템 도입 및 자동 냉각 시스템
                구축
              </span>
            </td>
            <td>
              <span style={{ backgroundColor: '#FCBE2D' }}>점검 필요</span>
            </td>
          </tr>
          <tr>
            <td>2025-02-11 / 19:00</td>
            <td>
              D구역에서 제품 적재 초과로 인한 경고음
              <br />
              <span>자동 중량 측정 시스템 도입 </span>
            </td>
            <td>
              <span style={{ backgroundColor: '#1CE660' }}>조치완료</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
