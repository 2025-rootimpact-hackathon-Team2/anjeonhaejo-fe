import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './UserReportView.module.css';

export default function UserReportView() {
  const [isOpen, setIsOpen] = useState(false);
  const [machineTags, setMachineTags] = useState([
    '기계소음이상',
    '누수발견',
    '과열감지',
    '부품손상',
  ]);
  const [envTags, setEnvTags] = useState([
    '환기불량',
    '적재물불안정',
    '밀폐공간',
    '추락함',
    '기계에 끼임',
  ]);
  const [urgTags, setUrgTags] = useState([
    '조치완료',
    '즉시조치필요',
    '점검필요',
  ]);

  return (
    <div>
      <h1>특이사항 작성</h1>
      <div>
        <span>구역</span>
        <span>#적재물불안정</span>
        <img
          onClick={() => setIsOpen(true)}
          src="/asset/images/user/plus.png"
          alt="plus"
        />
      </div>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <div>
        <input type="checkbox" />
        <span>전체 공지</span>
      </div>
      <div>
        <button>취소</button>
        <button>확인</button>
      </div>

      {/* 팝업 */}
      {isOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bottom-0 left-0 w-full h-[70vh] bg-white shadow-lg rounded-t-2xl flex flex-col p-4"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderTopLeftRadius: '0.9375rem',
            borderTopRightRadius: '0.9375rem',
            borderTop: '0.35px solid #AAACAE',
            background: '#FFF',
            boxShadow: '2px 9px 31px 0px rgba(149, 149, 149, 0.25)',
          }}
        >
          <div className={styles.p_TitleBox}>
            <h2 className={styles.p_title}>특이사항 태그</h2>
            <img
              onClick={() => setIsOpen(false)}
              src="/asset/images/user/close.svg"
              alt="닫기"
            />
          </div>
          <div className={styles.p_elementBox}>
            <span className={styles.p_subTitle}>구역</span>
            <ul className={styles.p_sectionList}>
              <li className={styles.p_section}>
                <span>A</span>구역
              </li>
              <li className={styles.p_section}>
                <span>B</span>구역
              </li>
              <li className={styles.p_section}>
                <span>C</span>구역
              </li>
              <li className={styles.p_section}>
                <span>D</span>구역
              </li>
            </ul>
          </div>
          <div className={styles.p_elementBox}>
            <span className={styles.p_subTitle}>기계</span>
            <ul className={styles.p_tagBox}>
              {machineTags.map((tag, index) => (
                <li className={styles.p_tagText} key={index}>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.p_elementBox}>
            <span className={styles.p_subTitle}>작업 환경</span>
            <ul className={styles.p_tagBox}>
              {envTags.map((tag, index) => (
                <li className={styles.p_tagText} key={index}>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.p_elementBox}>
            <span className={styles.p_subTitle}>긴급도</span>
            <ul className={styles.p_tagBox}>
              {urgTags.map((tag, index) => (
                <li className={styles.p_tagText} key={index}>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
