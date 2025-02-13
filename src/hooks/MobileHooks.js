import { useState, useEffect } from 'react';
import { get } from '../api/base';

const useReportForm = () => {
  const [workSpace, setWorkSpace] = useState(1);
  const [activeWorkSpace, setActiveWorkSpace] = useState('A 구역');
  const [tagList, setTagList] = useState([]);
  const [activeTags, setActiveTags] = useState(new Set());

  const fetchTags = async () => {
    try {
      const response = await get('/tag');
      setTagList(response.data);
      console.log('Tags fetched:', response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    const newActiveTags = new Set(activeTags);
    if (newActiveTags.has(tag)) {
      newActiveTags.delete(tag); // 이미 태그가 활성화되었으면 비활성화
    } else {
      newActiveTags.add(tag); // 활성화
    }
    setActiveTags(newActiveTags);
  };

  const handleWorkSpaceChange = (e) => {
    const selectedWorkSpace = e.target.value;
    setWorkSpace(selectedWorkSpace);

    // 구역 이름 설정
    const workspaceNames = ['A 구역', 'B 구역', 'C 구역', 'D 구역'];
    setActiveWorkSpace(workspaceNames[selectedWorkSpace - 1]);
  };

  return {
    workSpace,
    activeWorkSpace,
    tagList,
    activeTags,
    handleTagClick,
    handleWorkSpaceChange,
  };
};

export default useReportForm;
