import styled from 'styled-components';

export const StyledWrapper = styled.div`
  padding: 24px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

.ant-table {
    background: #ffffff;
    border-radius: 8px;
  }

.ant-table-thead > tr > th {
    background: #e0e0e0;
    color: #333;
    border-bottom: 2px solid #ddd;
    white-space: nowrap;
  }

.ant-table-tbody > tr > td {
    border-bottom: 1px solid #ddd;
    color: #333;
    word-break: break-word;
  }

.ant-table-tbody > tr:hover > td {
    background: #f0f0f0;
  }

.ant-pagination {
    margin-top: 16px;
    text-align: right;

   .ant-pagination-item-active {
      border-color: #007aff;
      background: #007aff22;
    }
  }

.ant-tag {
    border-radius: 4px;
    margin: 4px;
  }

.search-input {
   .ant-input {
      background: #ffffff;
      border-color: #ddd;
      color: #333;

      &:hover, &:focus {
        border-color: #007aff;
        box-shadow: 0 0 0 2px rgba(0, 122, 250, 0.2);
      }
    }

   .ant-input-prefix {
      color: #333;
    }
  }
`;

export const StyledHeader = styled.div`
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

export const UrlLink = styled.a`
  color: #007aff!important;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;