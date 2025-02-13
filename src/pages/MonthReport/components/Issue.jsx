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
            <td>평균소음레벨 감소</td>
            <td>
              <span>즉시조치</span>
            </td>
          </tr>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>평균소음레벨 감소</td>
            <td>
              <span>즉시조치</span>
            </td>
          </tr>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>평균소음레벨 감소</td>
            <td>
              <span>즉시조치</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
