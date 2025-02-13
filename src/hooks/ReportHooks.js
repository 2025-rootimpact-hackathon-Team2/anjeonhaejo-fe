import { useState, useEffect } from 'react';
import { get } from '../api/base';

const useReports = (initialPage = 0) => {
  const [page, setPage] = useState(initialPage);
  const [totalPage, setTotalPage] = useState(0);
  const [reportList, setReportList] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await get(`/report?page=${page}`);
      setTotalPage(response.data.totalPage);
      setReportList(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage - 1) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page]);

  return {
    reportList,
    totalPage,
    page,
    handlePrevPage,
    handleNextPage,
    handlePageChange,
  };
};

export default useReports;
