const DataTable = require('../components/DataTable').default;
const styled = require('styled-components').default;

// 定义一些与网络安全相关的样式
const StyledHome = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1px;

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .security-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }

  p {
    color: #555;
    text-align: center;
    font-size: 1.1em;
    margin: 1px 0;
    padding: 8px 12px;
    background: rgba(0, 122, 255, 0.1);
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
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

module.exports = Home;