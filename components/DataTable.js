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
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const [formData, setFormData] = useState({ id: '', title: '', url: '', tags: '', password: '' }); // 添加 password
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = useCallback(async (page, search) => {
    setLoading(true);
    try {
      const response = await fetch('/api/article/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, pageSize, searchText: search }),
      });

      if (!response.ok) throw new Error('Network Error');
      const results = await response.json();

      setData(
        results.data.map((item) => ({
          id: item.id,
          title: item.Title || '',
          url: item.URL || '',
          tag: Array.isArray(item.Tags) ? item.Tags.join(', ') : item.Tags || '-',
        }))
      );
      setTotal(results.pagination.total);
      setTotalPages(Math.ceil(results.pagination.total / pageSize));
      setCurrentPage(results.pagination.page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

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
      setFormData({ id: '', title: '', url: '', tags: '', password: '' });
      fetchData(currentPage, searchText);
    } catch (err) {
      setSubmissionStatus({ type: 'error', message: err.message });
    }
  };

  const updateArticle = async () => {
    try {
      const response = await fetch('/api/article/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update article');
      }
      const result = await response.json();
      setSubmissionStatus({ type: 'success', message: result.message });
      setFormData({ id: '', title: '', url: '', tags: '', password: '' });
      setIsEditing(false);
      fetchData(currentPage, searchText);
    } catch (err) {
      setSubmissionStatus({ type: 'error', message: err.message });
    }
  };

  useEffect(() => {
    fetchData(1, '');
  }, [fetchData]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage, searchText);
  }, [fetchData, searchText]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateArticle();
    } else {
      addArticle();
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setFormData({
      id: record.id,
      title: record.title,
      url: record.url,
      tags: record.tag,
      password: '', // 重置密码
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: '', title: '', url: '', tags: '', password: '' });
    setSubmissionStatus(null);
  };

  const highlightText = (text, search) => {
    if (!search || !text) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>{part}</span>
      ) : part
    );
  };

  return (
    <div className={styles.dataTableWrapper}>
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
          {isEditing && (
            <input
              type="password"
              name="password"
              placeholder="请输入编辑密码"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          )}
          <button type="submit" className={styles.submitButton}>
            {isEditing ? '保存修改' : '添加'}
          </button>
          {isEditing && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancelEdit}
            >
              取消
            </button>
          )}
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

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索标题或标签..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingText}>加载中...</span>
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorText}>加载失败：{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={styles.tableHeaderCell}>标题</th>
                <th className={styles.tableHeaderCell}>链接</th>
                <th className={styles.tableHeaderCell}>标签</th>
                <th className={styles.tableHeaderCell}>操作</th>
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
                    <td className={styles.tableCell}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(record)}
                      >
                        编辑
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noDataCell}>
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.paginationContainer}>
        <span className={styles.pageInfo}>
          显示 {(currentPage - 1) * pageSize + 1} -{' '}
          {Math.min(currentPage * pageSize, total)} 条，共 {total} 条
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