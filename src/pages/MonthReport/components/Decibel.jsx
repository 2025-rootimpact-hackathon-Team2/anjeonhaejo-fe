import React from 'react';
import styles from './Decibel.module.css';

export default function Decibel({ title, decibel, color }) {
  const maxDecibel = 125;
  const barWidth = (decibel / maxDecibel) * 100;

  return (
    <section className={styles.section}>
      <div className={styles.titleBox}>
        <h2>{title}</h2>
        {color !== '#3A37EF' && <p style={{ color: color }}>{decibel} dB</p>}
        {color == '#3A37EF' && <p>{decibel} dB</p>}
        <div
          className={styles.barGraph}
          style={{ width: `${barWidth}%`, backgroundColor: color }}
        ></div>
      </div>
    </section>
  );
}
