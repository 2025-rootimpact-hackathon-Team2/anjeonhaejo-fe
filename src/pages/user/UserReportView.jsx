import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './UserReportView.module.css';
import { post } from '../../api/base';
import useReportForm from '../../hooks/MobileHooks';

export default function UserReportView() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const {
    workSpace,
    activeWorkSpace,
    tagList,
    activeTags,
    handleTagClick,
    handleWorkSpaceChange,
  } = useReportForm();

  const handleSubmit = async () => {
    const params = {
      content: content,
      workerLineId: workSpace,
      tagNames: Array.from(activeTags),
    };

    try {
      const response = await post('/report/create', params);
      console.log('Report submitted:', response.data);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>특이사항 작성</h1>
      <div className={styles.sectionList}>
        <p className={`${styles.section} ${styles.active}`}>
          <span>{activeWorkSpace.split(' ')[0]}</span>구역
        </p>
        {Array.from(activeTags).map((tag, index) => (
          <p className={`${styles.p_tagText} ${styles.active}`} key={index}>
            #{tag}
          </p>
        ))}
        <img
          onClick={() => setIsOpen(true)}
          src="/asset/images/user/plus.png"
          alt="plus"
          className={styles.plus}
        />
      </div>
      <div className={styles.textAreaBox}>
        <textarea
          placeholder="내용을 작성하세요."
          cols="30"
          rows="10"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={() => fileInputRef.current.click()}>
          <img src="/asset/images/user/camera.png" alt="" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*;capture=camera"
          />
        </button>
      </div>
      <div className={styles.btnBox}>
        <button>취소</button>
        <button onClick={handleSubmit}>확인</button>
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
                <input
                  type="radio"
                  id="optionA"
                  name="section"
                  value="1"
                  checked={workSpace == 1}
                  onChange={handleWorkSpaceChange}
                />
                <label htmlFor="optionA">A 구역</label>
              </li>
              <li className={styles.p_section}>
                <input
                  type="radio"
                  id="optionB"
                  name="section"
                  value="2"
                  checked={workSpace == 2}
                  onChange={handleWorkSpaceChange}
                />
                <label htmlFor="optionB">B 구역</label>
              </li>
              <li className={styles.p_section}>
                <input
                  type="radio"
                  id="optionC"
                  name="section"
                  value="3"
                  checked={workSpace == 3}
                  onChange={handleWorkSpaceChange}
                />
                <label htmlFor="optionC">C 구역</label>
              </li>
              <li className={styles.p_section}>
                <input
                  type="radio"
                  id="optionD"
                  name="section"
                  value="4"
                  checked={workSpace == 4}
                  onChange={handleWorkSpaceChange}
                />
                <label htmlFor="optionD">D 구역</label>
              </li>
            </ul>
          </div>
          <div>
            {tagList.map((category) => {
              const categoryName = category.categoryName;
              const tags = category.tagMap ? Object.keys(category.tagMap) : [];

              return (
                <div className={styles.p_elementBox} key={categoryName}>
                  <span className={styles.p_subTitle}>{categoryName}</span>
                  <ul className={styles.p_tagBox}>
                    {tags.map((tag, index) => (
                      <li
                        className={`${styles.p_tagText} ${
                          activeTags.has(tag) ? styles.active : ''
                        }`}
                        key={index}
                        onClick={() => handleTagClick(tag)} // 태그 클릭 시 active 상태 변경
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
