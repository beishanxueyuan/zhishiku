import React from 'react';
import styled from 'styled-components';
import DataTable from '../components/DataTable';

const StyledHeader = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #111827;

  span {
    color: #3b82f6;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.a`
  background: none;
  padding: 8px;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

const AboutMeText = styled.a`
  font-size: 18px; /* 增大字体，让它更显眼 */
  color: #1f2937; /* 使用深灰色，既现代又大方 */
  cursor: pointer;
  margin: 0;
  font-weight: 500; /* 适度加粗字体，提升显眼性 */
  padding: 4px 8px; /* 增加一点内边距，使文字更加清晰 */
  border-radius: 4px; /* 给文字加圆角，增添一些现代感 */
  transition: all 0.3s ease; /* 为交互效果设置平滑过渡 */

  &:hover {
    color: #3b82f6; /* 鼠标悬停时变为蓝色，更加突出 */
    background-color: #f1f5f9; /* 背景颜色在悬停时轻微变化，使文字更加立体 */
    text-decoration: none; /* 保证没有下划线 */
  }

  &:focus {
    outline: none; /* 去除焦点时的默认边框 */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); /* 焦点时显示蓝色阴影，突出交互 */
  }
`;


const MainContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <div>
      <StyledHeader>
        <HeaderContent>
          <Logo>
            北山学院<span>知识库</span>
          </Logo>
          <HeaderActions>
            <AboutMeText href="https://www.beishanxueyuan.com/" target="_blank">关于我们</AboutMeText>
            <IconButton href="https://github.com/beishanxueyuan/zhishiku" target="_blank">
              <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
              </svg>
            </IconButton>
            <IconButton href="https://x.com/chain00x" target="_blank">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-18jsvk2 r-16y2uox r-8kz0gk" width="24" height="24">
                <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
              </svg>
            </IconButton>
          </HeaderActions>
        </HeaderContent>
      </StyledHeader>

      <MainContainer>
        {/* <PageHeader>
          <Title>文章链接管理</Title>
          <Subtitle>
            学习将伴随人的一生
          </Subtitle>
        </PageHeader> */}

        <DataTable />
      </MainContainer>

      <footer style={{ 
        textAlign: 'center', 
        padding: '24px', 
        color: '#6b7280',
        borderTop: '1px solid #e5e7eb',
        marginTop: '48px'
      }}>
        © 2024 北山学院知识库. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;