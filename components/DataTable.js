import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import styles from './styles/DataTable.module.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0); // 新增 total 状态
  const pageSize = 10;

  const [formData, setFormData] = useState({ title: '', url: '', tags: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // 数据获取逻辑
  const fetchData = useCallback(async (page, search) => {
    setLoading(true);
    try {
      const response = await fetch('/api/article/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          pageSize,
          searchText: search,
        }),
      });

      if (!response.ok) throw new Error('Network Error');
      const results = await response.json();

      setData(
        results.data.map((item) => ({
          title: item.Title || '',
          url: item.URL || '',
          tag: item.Tags || '-',
        }))
      );
      setTotal(results.pagination.total); // 保存 total 到状态
      setTotalPages(Math.ceil(results.pagination.total / pageSize));
      setCurrentPage(results.pagination.page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // 插入数据逻辑
  const addArticle = async () => {
    try {
      const response = await fetch('/api/article/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add article');
      const result = await response.json();
      setSubmissionStatus({ type: 'success', message: result.message });

      setFormData({ title: '', url: '', tags: '' });
      fetchData(currentPage, searchText);
    } catch (err) {
      setSubmissionStatus({ type: 'error', message: err.message });
    }
  };

  // 初始化加载数据（无搜索条件）
  useEffect(() => {
    fetchData(1, '');
  }, [fetchData]);

  // 分页切换逻辑
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage, searchText);
  }, [fetchData, searchText]);

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle();
  };

  // 处理搜索
  const handleSearch = () => {
    setCurrentPage(1); // 重置到第一页
    fetchData(1, searchText);
  };

  // 处理输入框按键事件（回车触发搜索）
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // 高亮关键词的辅助函数
  const highlightText = (text, search) => {
    if (!search || !text) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={styles.dataTableWrapper}>
      {/* 添加文章表单 */}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <input
            type="text"
            name="title"
            placeholder="标题"
            value={formData.title}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
          <input
            type="url"
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="标签（用逗号分隔）"
            value={formData.tags}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
          <button type="submit" className={styles.submitButton}>
            添加
          </button>
        </form>
        {submissionStatus && (
          <div
            className={
              submissionStatus.type === 'success'
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {submissionStatus.message}
          </div>
        )}
      </div>

      {/* 搜索框和按钮 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="输入关键词后点击搜索或按回车..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* 加载中的提示 */}
      {loading && (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingText}>数据加载中...</span>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorText}>加载失败：{error}</span>
        </div>
      )}

      {/* 表格内容 */}
      {!loading && !error && (
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={styles.tableHeaderCell}>标题</th>
                <th className={styles.tableHeaderCell}>链接</th>
                <th className={styles.tableHeaderCell}>标签</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((record, index) => (
                  <tr key={index}>
                    <td className={styles.tableCell}>
                      {highlightText(record.title, searchText)}
                    </td>
                    <td className={styles.tableCell}>
                      {record.url ? (
                        <a
                          href={record.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {highlightText(new URL(record.url).hostname, searchText)}
                        </a>
                      ) : '-'}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.tagBox}>
                        {highlightText(record.tag, searchText)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.noDataCell}>
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 分页控件 */}
      <div className={styles.paginationContainer}>
        <span className={styles.pageInfo}>
          显示 {(currentPage - 1) * pageSize + 1} -{' '}
          {Math.min(currentPage * pageSize, total)} 条， {/* 使用 total 状态 */}
          共 {total} 条数据
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                第 {page} 页
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
    </div>
  );
};

export default DataTable;