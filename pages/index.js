import React, { useState } from 'react';
import styled from 'styled-components';
import DataTable from '../components/DataTable';
import Zhishiyuan from '../components/Zhishiyuan';


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
  box-shadow: 2px 0 5px rgba(0,0,0,0.05);
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


const MainContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;


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
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <MenuItemText $isExpanded={isMenuExpanded}>首页</MenuItemText>
        </MenuItem>


        <MenuItem 
          $active={activeMenu === 'articles'}
          onClick={() => handleMenuClick('articles')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
          </svg>
          <MenuItemText $isExpanded={isMenuExpanded}>文章列表</MenuItemText>
        </MenuItem>


        <MenuItem 
          $active={activeMenu === 'zhishiyuan'}
          onClick={() => handleMenuClick('zhishiyuan')}
        >
          <svg width="24" height="24" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path>
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
              {/* 原有的头部操作按钮 */}
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