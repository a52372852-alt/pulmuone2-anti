import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Home as HomeIcon } from 'lucide-react';

// Main Blue Navigation Bar
export function NavigationBar() {
  const { currentPage, setCurrentPage, theme, toggleTheme, globalSearchTerm, setGlobalSearchTerm } = useApp();
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setGlobalSearchTerm(searchTerm);
      setCurrentPage('products');
    }
  };

  // 요청에 따른 네비게이션 메뉴 (회사소개 좌측에 홈 버튼 생성)
  const navMenuItems = [
    { id: 'home', label: '홈', icon: <HomeIcon size={16} style={{ marginRight: '4px' }} /> },
    { id: 'company', label: '회사소개' },
    { id: 'products', label: '제품소개' },
    { id: 'promotions', label: '신상품&행사' },
    { id: 'recipes', label: '레시피&식단' },
    { id: 'customer', label: '고객센터' }
  ];

  return (
    <div
      className="no-print jw-nav-bar"
      style={{
        backgroundColor: '#0284c7',
        background: 'linear-gradient(90deg, #0369a1 0%, #0284c7 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px' }}>
        {/* Nav Items (홈버튼이 회사소개 좌측 첫 번째에 배치) */}
        <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {navMenuItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`jw-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0 1.25rem',
                  height: '100%',
                  border: 'none',
                  background: isActive ? '#0369a1' : 'transparent',
                  color: '#ffffff',
                  fontWeight: isActive ? '900' : '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: isActive ? 'inset 0 -3px 0 #fde047' : 'none'
                }}
              >
                {item.icon && item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Search Form & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'white' }}>제품검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.82rem',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                width: '130px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#0369a1',
                color: 'white',
                border: '1px solid #0284c7',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
              title="검색"
            >
              🔍
            </button>
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              padding: '0.35rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="테마 변경"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} color="#f59e0b" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
