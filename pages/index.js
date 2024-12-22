import React from 'react';
import DataTable from '../components/DataTable';
import styled from 'styled-components';

// 定义一些与网络安全相关的样式
const StyledHome = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1px;

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px; /* 减少下边距 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .security-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }

  /* 优化的段落样式 */
  p {
    color: #555; /* 字体颜色 */
    text-align: center; /* 居中显示 */
    font-size: 1.1em; /* 稍微调整字体大小 */
    margin: 1px 0; /* 减少上下边距 */
    padding: 8px 12px; /* 调整内边距 */
    background: rgba(0, 122, 255, 0.1); /* 背景色 */
    border-radius: 5px; /* 圆角 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    transition: all 0.3s ease; /* 添加过渡效果 */
  }
`;

const Home = () => {
    return (
        <StyledHome>
            <title>北山学院知识库</title>
            <DataTable />
        </StyledHome>
    );
};

export default Home;