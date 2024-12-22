import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Space, Tag, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Highlighter from 'react-highlight-words';

// 解构出Typography中的Paragraph（虽然当前代码未使用到，但保持解构习惯方便后续扩展）

// 整体包装容器样式，采用灰色系背景，模拟网络安全相关界面常见的沉稳色调
const StyledWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5; /* 灰色背景，给人沉稳、专业的感觉，贴合网络安全视觉风格 */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* 表格主体样式 */
 .ant-table {
    background: #ffffff;
    border-radius: 8px;
  }

  /* 表头样式，采用浅灰色背景，文字颜色较深，有清晰的视觉区分 */
 .ant-table-thead > tr > th {
    background: #e0e0e0;
    color: #333;
    border-bottom: 2px solid #ddd;
    white-space: nowrap;
  }

  /* 表体样式，每行有下边框区分，文字颜色保持一致 */
 .ant-table-tbody > tr > td {
    border-bottom: 1px solid #ddd;
    color: #333;
    word-break: break-word;
  }

  /* 鼠标悬停行的样式，有淡淡的背景色变化，增强交互感 */
 .ant-table-tbody > tr:hover > td {
    background: #f0f0f0;
  }

 .ant-pagination {
    margin-top: 16px;
    text-align: right;

    /* 当前选中页码的样式，采用蓝色系色调突出显示，符合网络安全相关界面中重要元素突出的特点 */
   .ant-pagination-item-active {
      border-color: #007aff;
      background: #007aff22;
    }
  }

 .ant-tag {
    border-radius: 0px;
    margin: 0px;
  }

 .search-input {
   .ant-input {
      background: #ffffff;
      border-color: #ddd;
      color: #333;

      &:hover,
      &:focus {
        border-color: #007aff; /* 输入框获取焦点时边框变为蓝色，引导用户焦点，在网络安全界面中便于用户操作提示 */
        box-shadow: 0 0 0 2px rgba(0, 122, 250, 0.2);
      }
    }

   .ant-input-prefix {
      color: #333;
    }
  }
`;

// 头部区域样式，采用flex布局来排列内部元素，水平方向两端对齐
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    color: #333;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// 链接样式，蓝色为主色调，鼠标悬停有透明度变化，符合常见的网页交互风格且在网络安全界面中便于识别链接元素
const UrlLink = styled.a`
  color: #007aff!important;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const DataTable = () => {
    // 数据相关状态
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    // 加载状态
    const [loading, setLoading] = useState(true);
    // 错误信息状态
    const [error, setError] = useState(null);
    // 搜索文本状态
    const [searchText, setSearchText] = useState('');
    // 表格分页等参数状态
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });

    // 用于获取数据的异步函数，这里添加了更详细的错误处理（可根据实际情况完善错误日志记录等网络安全相关机制）
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/article/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                // 在网络错误时记录错误信息，便于排查问题，符合网络安全中对问题追踪的要求
                console.error('网络请求出现错误:', response.statusText);
                throw new Error('网络错误');
            }

            const result = await response.json();
            const results = result.results
                .filter(item => item.properties?.URL?.url) // 过滤掉没有 URL 的项目
                .map(item => ({
                    title: item.properties?.Title?.title[0]?.text?.content || '',
                    url: item.properties?.URL?.url || '',
                    tag: item.properties?.Tags?.multi_select[0]?.name || '',
                }));

            setAllData(results);
            // 更新分页参数中的总数据量
            setTableParams(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    total: results.length,
                },
            }));
            // 初始设置显示的数据为第一页的数据
            setData(results.slice(0, tableParams.pagination.pageSize));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 根据搜索文本过滤数据的函数，利用useMemo进行性能优化，只有依赖项变化时才重新计算
    const filteredData = useMemo(() => {
        if (!searchText) {
            return allData;
        }
        const normalizedSearch = searchText.toLowerCase().trim();
        return allData.filter(item => {
            return (
                item.title.toLowerCase().includes(normalizedSearch) ||
                item.url.toLowerCase().includes(normalizedSearch) ||
                item.tag.toLowerCase().includes(normalizedSearch)
            );
        });
    }, [searchText, allData]);

    useEffect(() => {
        // 根据过滤后的数据更新当前显示的数据以及分页参数中的总数据量
        setData(filteredData.slice(0, tableParams.pagination.pageSize));
        setTableParams(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                current: 1,
                total: filteredData.length,
            },
        }));
    }, [filteredData]);

    // 处理表格分页变化的函数
    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;
        setTableParams({
            ...tableParams,
            pagination: pagination,
        });
        setData(filteredData.slice((current - 1) * pageSize, current * pageSize));
    };

    // 处理搜索文本变化的函数
    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <span style={{ color: '#333', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {searchText ? (
                        <Highlighter
                            highlightStyle={{ backgroundColor: '#e0f7fa', padding: 0 }}
                            searchWords={[searchText]}
                            autoEscape
                            textToHighlight={text}
                        />
                    ) : text}
                </span>
            ),
            width: '40%',
        },
        {
            title: '链接',
            dataIndex: 'url',
            key: 'url',
            width: '30%',
            render: (url) => {
                const displayUrl = url ? new URL(url).hostname : '';
                return url ? (
                    <UrlLink href={url} target="_blank" rel="noopener noreferrer">
                        {displayUrl}
                    </UrlLink>
                ) : '-';
            },
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
            width: '20%',
            render: (tag) => (
                tag ? (
                    <Tag color="#80d8ff" style={{ color: '#333' }}>
                        {tag}
                    </Tag>
                ) : '-'
            ),
        },
    ];

    if (error) {
        return (
            <Alert
                message="错误"
                description={error}
                type="error"
                showIcon
                style={{ margin: '24px' }}
            />
        );
    }

    return (
        <StyledWrapper>
            <StyledHeader>
                <Space>
                    <Input
                        className="search-input"
                        prefix={<SearchOutlined />}
                        placeholder="搜索..."
                        allowClear
                        value={searchText}
                        onChange={e => handleSearch(e.target.value)}
                        style={{ width: 250 }}
                    />
                </Space>
            </StyledHeader>

            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    ...tableParams.pagination,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: total => `共 ${total} 条数据`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
                onChange={handleTableChange}
                loading={loading}
                rowKey={record => record.id}
                scroll={{ x: 800 }}
            />
        </StyledWrapper>
    );
};

export default DataTable;