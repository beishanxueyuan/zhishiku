import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from '../components/DataTable';
import Zhishiyuan from '../components/Zhishiyuan';

// 定义样式组件
const SideMenu = styled.div`
  width: ${props => props.$isExpanded ? '250px' : '80px'};
  background-color: #ffffff;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  border-right: 1px solid #e5e7eb;
  overflow-x: hidden;
  z-index: 100;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
`;

const MenuToggleButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  color: #6b7280;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${props => props.$active ? '#3b82f6' : '#6b7280'};

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MenuItemText = styled.span`
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  width: ${props => props.$isExpanded ? 'auto' : '0'};
`;

const ContentWrapper = styled.div`
  margin-left: ${props => props.$isExpanded ? '250px' : '80px'};
  transition: margin-left 0.3s ease;
`;

const Header = styled.header`
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

const HeaderLink = styled.a`
  display: flex;
  align-items: center;
  color: #6b7280;
  text-decoration: none;
  margin-left: 16px;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #3b82f6;
  }
`;

const HoverText = styled.span`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${HeaderLink}:hover & {
    opacity: 1;
  }
`;

const MainContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

// 定义 SVG 图标组件
function AboutUsIcon() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.6-9.83L0 1.154h7.594l5.243 6.932z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// 主页面组件
const HomePage = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState('home');
  const [renderComponent, setRenderComponent] = useState(<DataTable />);

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'zhishiyuan') {
      setRenderComponent(<Zhishiyuan />);
    } else {
      setRenderComponent(<DataTable />);
    }
  };

  return (
    <div>
      <SideMenu $isExpanded={isMenuExpanded}>
        <MenuToggleButton onClick={toggleMenu}>
          {isMenuExpanded ? '←' : '→'}
        </MenuToggleButton>

        <MenuItem 
          $active={activeMenu === 'home'}
          onClick={() => handleMenuClick('home')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <MenuItemText $isExpanded={isMenuExpanded}>首页</MenuItemText>
        </MenuItem>

        <MenuItem 
          $active={activeMenu === 'articles'}
          onClick={() => handleMenuClick('articles')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
          </svg>
          <MenuItemText $isExpanded={isMenuExpanded}>文章列表</MenuItemText>
        </MenuItem>

        <MenuItem 
          $active={activeMenu === 'zhishiyuan'}
          onClick={() => handleMenuClick('zhishiyuan')}
        >
          <svg width="24" height="24" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          <MenuItemText $isExpanded={isMenuExpanded}>知识源</MenuItemText>
        </MenuItem>
      </SideMenu>

      <ContentWrapper $isExpanded={isMenuExpanded}>
        <Header>
          <HeaderContent>
            <Logo>
              北山学院<span>知识库</span>
            </Logo>
            <HeaderActions>
              {/* 关于我们 */}
              <HeaderLink href="https://www.beishanxueyuan.com/" target="_blank" title="关于我们">
                <AboutUsIcon />
                <HoverText>关于我们</HoverText>
              </HeaderLink>

              {/* X */}
              <HeaderLink href="https://x.com/chain00x" target="_blank" title="X">
                <XIcon />
                <HoverText>X</HoverText>
              </HeaderLink>

              {/* GitHub */}
              <HeaderLink href="https://github.com/beishanxueyuan/zhishiku" target="_blank" title="GitHub">
                <GitHubIcon />
                <HoverText>GitHub</HoverText>
              </HeaderLink>
            </HeaderActions>
          </HeaderContent>
        </Header>

        <MainContainer>
          {renderComponent}
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
      </ContentWrapper>
    </div>
  );
};

export default HomePage;