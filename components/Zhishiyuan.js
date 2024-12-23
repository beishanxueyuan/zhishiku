import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import styles from './styles/DataTable.module.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/zhishiyuan/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error('Network Error');

      const { results } = await response.json();
      const filteredResults = results
        .filter(item => item.properties?.url)
        .map(item => ({
          title: item.properties.title.rich_text[0].text.content || '',
          url: item.properties.url.title[0].text.content || '',
          tag: item.properties.tag.select.name || '',
        }));

      setAllData(filteredResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    let filtered = allData;
    
    if (searchText) {
      const normalizedSearch = searchText.toLowerCase().trim();
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(normalizedSearch)
        )
      );
    }
    
    return filtered;
  }, [searchText, allData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredData, pageSize]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
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
    },
    {
      title: '链接',
      dataIndex: 'url',
      key: 'url',
      width: '35%',
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
      width: '25%',
      render: (tag) => (tag ? <span className={styles.tag}>{tag}</span> : '-'),
    },
  ];

  return (
    <div className={styles.dataTableWrapper}>
      {/* 搜索框 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Search className={styles.searchIcon} size={20} />
        </div>
      </div>

      {/* 加载中的提示 */}
      {loading && (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingText}>数据加载中...</span>
        </div>
      )}

      {/* 表格内容 */}
      {!loading && (
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {columns.map(column => (
                  <th 
                    key={column.key} 
                    className={styles.tableHeaderCell}
                    style={{ width: column.width }}
                  >
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
                      {column.render ? column.render(record[column.dataIndex]) : record[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 分页控件 */}
      <div className={styles.paginationContainer}>
        <span className={styles.pageInfo}>
          显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredData.length)} 条，
          共 {filteredData.length} 条数据
        </span>

        <div className={styles.paginationControls}>
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
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from(
              { length: Math.ceil(filteredData.length / pageSize) },
              (_, i) => i + 1
            ).map(page => (
              <option key={page} value={page}>
                第 {page} 页
              </option>
            ))}
          </select>

          <button
            className={styles.paginationButton}
            disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;