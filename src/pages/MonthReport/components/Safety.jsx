import React from 'react';
import styles from './Safety.module.css';

export default function Safety() {
  return (
    <section className={styles.section}>
      <h1>이번달 안전 보고서</h1>
      <table>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>작성일</th>
            <th>구역</th>
            <th>태그 및 특이사항</th>
            <th>상태</th>
            <th>작업자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>A</td>
            <td>
              <span>즉시조치</span>
            </td>
            <td>조치완료</td>
            <td>김말숙</td>
          </tr>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>A</td>
            <td>
              <span>즉시조치</span>
            </td>
            <td>조치완료</td>
            <td>김말숙</td>
          </tr>
          <tr>
            <td>2024-02-23 / 08:00</td>
            <td>A</td>
            <td>
              <span>즉시조치</span>
            </td>
            <td>조치완료</td>
            <td>김말숙</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
