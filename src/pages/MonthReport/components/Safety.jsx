import React from 'react';
import styles from './Safety.module.css';
import useReports from '../../../hooks/ReportHooks';

export default function Safety() {
  const {
    reportList,
    totalPage,
    page,
    handlePrevPage,
    handleNextPage,
    handlePageChange,
  } = useReports();

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
          {reportList.map((report, index) => (
            <tr key={index}>
              <td>{new Date(report.createdAt).toLocaleString()}</td>
              <td>{report.workingZone}</td>
              <td>
                <span className={styles.tag}>#{report.tag}</span>
                <span>{report.significant}</span>
              </td>
              <td>{report.status}</td>
              <td>{report.workerName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul>
        <li className={styles.left} onClick={handlePrevPage}></li>
        {Array.from({ length: totalPage }, (_, index) => (
          <li
            key={index}
            className={page === index ? styles.active : ''}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </li>
        ))}
        <li className={styles.right} onClick={handleNextPage}></li>
      </ul>
    </section>
  );
}
