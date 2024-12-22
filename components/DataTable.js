import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/DataTable.module.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/article/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error('Network Error');

      const { results } = await response.json();
      const filteredResults = results
        .filter(item => item.properties?.URL?.url)
        .map(item => ({
          title: item.properties?.Title?.title?.[0]?.text?.content || '',
          url: item.properties?.URL?.url || '',
          tag: item.properties?.Tags?.multi_select?.[0]?.name || '',
        }));

      setAllData(filteredResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return allData;
    const normalizedSearch = searchText.toLowerCase().trim();
    return allData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(normalizedSearch)
      )
    );
  }, [searchText, allData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredData, pageSize]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when data changes
  }, [filteredData]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

  const handleSearch = (value) => setSearchText(value);


    const handleSelectPage = (event) => {
        const page = Number(event.target.value);
        setCurrentPage(page);
    };


  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <span className={styles.cellText}>
          {searchText
            ? text.split(new RegExp(`(${searchText})`, 'gi')).map((part, index) =>
                part.toLowerCase() === searchText.toLowerCase() ? (
                  <span key={index} className={styles.highlight}>{part}</span>
                ) : (
                  part
                )
              )
            : text}
        </span>
      ),
      width: '40%',
    },
    {
      title: '链接',
      dataIndex: 'url',
      key: 'url',
      width: '30%',
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {new URL(url).hostname}
          </a>
        ) : (
          '-'
        ),
    },
    {
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      width: '20%',
      render: (tag) => (tag ? <span className={styles.tag}>{tag}</span> : '-'),
    },
  ];

  if (error) {
    return <div className={styles.errorAlert}><span>错误提示</span><p>{error}</p></div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dataTableWrapper}>
      <div className={styles.searchHeader}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="请输入关键词搜索..."
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className={styles.tableHeaderCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key} className={styles.tableCell}>
                  {column.render(record[column.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginationContainer}>
          <span className={styles.pageInfo}>当前第 {currentPage} 页，共 {filteredData.length} 条数据</span>

          <button
              className={styles.paginationButton}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
          >
              上一页
          </button>

          <select
              className={styles.pageSelector}
              value={currentPage}
              onChange={handleSelectPage}
            >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <option key={page} value={page}>
                        {page}
                    </option>
                ))}
            </select>
          <button
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            下一页
          </button>
      </div>
    </div>
  );
};

export default DataTable;
